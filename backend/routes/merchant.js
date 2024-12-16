const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { apiAuth } = require("../middleware/apiAuth");
const MerchantCustomerLog = require("../models/MerchantCustomerLog");
const bcrypt = require("bcryptjs");

const saveTransaction = async (
  fromWalletId,
  toWalletId,
  amount,
  type,
  status,
  description = null,
  senderName,
  receiverName
) => {
  try {
    const transaction = new Transaction({
      from_wallet_id: fromWalletId,
      to_wallet_id: toWalletId,
      amount,
      transaction_type: type,
      status,
      description: description || "Wallet to Wallet Transfer",
      sender_name: senderName,
      reciever_name: receiverName,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await transaction.save();
    return transaction;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw error;
  }
};

const getUserFullName = async (userId) => {
  const user = await User.findOne({ user_id: userId });
  if (!user) throw new Error(`User with ID ${userId} not found`);
  return `${user.first_name} ${user.last_name}`;
};

const getUserEmail = async (userId) => {
  const user = await User.findOne({ user_id: userId });
  if (!user) throw new Error(`User with ID ${userId} not found`);
  return user.email;
};

const updateMerchantCustomerLog = async (merchantId, customerId, name, email) => {
  const now = new Date();

  const existingLog = await MerchantCustomerLog.findOne({
    merchant_id: merchantId,
    customer_id: customerId,
  });

  if (existingLog) {
    // If the log exists, update it
    existingLog.last_transaction_date = now;
    existingLog.transaction_count += 1;
    await existingLog.save();
  } else {
    // Otherwise, create a new log
    const newLog = new MerchantCustomerLog({
      merchant_id: merchantId,
      customer_id: customerId,
      first_transaction_date: now,
      last_transaction_date: now,
      customer_name: name,
      customer_email: email,
      transaction_count: 1,
    });
    await newLog.save();
  }
};

router.post("/one-time", apiAuth, async (req, res) => {
  const { customer_email, password, amount, description } = req.body;

  try {
    // Validate input
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Get the merchant_user_id from the validated API key
    const merchantUserId = req.user.user_id;
    console.log(merchantUserId)

    // Find the customer by email
    const customer = await User.findOne({ email: customer_email });
    if (!customer || customer.account_type !== "Customer") {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Verify the customer's password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      // Save the failed transaction
      await saveTransaction(
        null,
        null,
        amount,
        "Payment",
        "Failed",
        description,
        customer ? `${customer.first_name} ${customer.last_name}` : null,
        req.merchant_name
      );
      return res.status(401).json({ message: "Invalid customer credentials" });
    }

    // Fetch wallets for both the customer and merchant
    const customerWallet = await Wallet.findOne({ user_id: customer.user_id });
    const merchantWallet = await Wallet.findOne({ user_id: merchantUserId });

    console.log("merchant wallet is: "+ merchantWallet)

    if (!customerWallet || !merchantWallet) {
      return res
        .status(500)
        .json({ message: "Wallets not found for customer or merchant" });
    }

    // Check if the customer has sufficient balance
    if (customerWallet.balance < amount) {
      // Save the failed transaction
      await saveTransaction(
        customerWallet.wallet_id,
        merchantWallet.wallet_id,
        amount,
        "Payment",
        "Failed",
        description,
        `${customer.first_name} ${customer.last_name}`,
        req.merchant_name
      );
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Process the transaction
    customerWallet.balance -= amount;
    merchantWallet.balance += amount;

    await customerWallet.save();
    await merchantWallet.save();

    // Get full names of customer and merchant
    const senderName = `${customer.first_name} ${customer.last_name}`;
    const receiverName = await getUserFullName(merchantUserId);
    const customerEmail = await getUserEmail(customer.user_id)

    // Save the successful transaction
    const transaction = await saveTransaction(
      customerWallet.wallet_id,
      merchantWallet.wallet_id,
      amount,
      "Payment",
      "Completed",
      description,
      senderName,
      receiverName
    );

    if (transaction.status === "Completed") {
      await updateMerchantCustomerLog(merchantUserId, customer.user_id, senderName, customerEmail);
    }

    res.status(200).json({
      message: "Transaction completed successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/metrics/customers", apiAuth, async (req, res) => {
  const { period } = req.query; // e.g., "week", "month", "year"
  const merchantId = req.merchant_user_id;

  try {
    const now = new Date();
    let startDate, previousStartDate, previousEndDate;

    // Determine the start and comparison timeframes based on the period
    if (period === "week") {
      const dayOfWeek = now.getDay(); // Get current day of the week
      startDate = new Date(now.setDate(now.getDate() - dayOfWeek)); // Start of this week
      previousStartDate = new Date(startDate);
      previousStartDate.setDate(startDate.getDate() - 7); // Start of last week
      previousEndDate = new Date(startDate);
      previousEndDate.setDate(startDate.getDate() - 1); // End of last week
    } else if (period === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
      previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // Start of last month
      previousEndDate = new Date(now.getFullYear(), now.getMonth(), 0); // End of last month
    } else if (period === "year") {
      startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
      previousStartDate = new Date(now.getFullYear() - 1, 0, 1); // Start of last year
      previousEndDate = new Date(now.getFullYear() - 1, 11, 31); // End of last year
    } else {
      return res.status(400).json({ message: "Invalid period specified" });
    }

    // Fetch logs for the current period
    const currentLogs = await MerchantCustomerLog.find({
      merchant_id: merchantId,
      last_transaction_date: { $gte: startDate },
    });

    // Fetch logs for the previous period
    const previousLogs = await MerchantCustomerLog.find({
      merchant_id: merchantId,
      last_transaction_date: {
        $gte: previousStartDate,
        $lte: previousEndDate,
      },
    });

    // Calculate new and returning customers for the current period
    const currentNewCustomers = currentLogs.filter(
      (log) => log.first_transaction_date >= startDate
    ).length;
    const currentReturningCustomers = currentLogs.length - currentNewCustomers;

    // Calculate new and returning customers for the previous period
    const previousNewCustomers = previousLogs.filter(
      (log) => log.first_transaction_date >= previousStartDate
    ).length;
    const previousReturningCustomers =
      previousLogs.length - previousNewCustomers;

    // Helper function to calculate percentage difference
    const calculatePercentageDifference = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0; // Avoid division by zero
      return ((current - previous) / previous) * 100;
    };

    // Calculate percentage differences
    const totalCustomersChange = calculatePercentageDifference(
      currentLogs.length,
      previousLogs.length
    );
    const newCustomersChange = calculatePercentageDifference(
      currentNewCustomers,
      previousNewCustomers
    );
    const returningCustomersChange = calculatePercentageDifference(
      currentReturningCustomers,
      previousReturningCustomers
    );

    // Respond with metrics
    res.status(200).json({
      period,
      totalCustomers: currentLogs.length,
      totalCustomersChange, // Percentage difference
      newCustomers: currentNewCustomers,
      newCustomersChange, // Percentage difference
      returningCustomers: currentReturningCustomers,
      returningCustomersChange, // Percentage difference
    });
  } catch (error) {
    console.error("Error fetching merchant metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/metrics/refunds", apiAuth, async (req, res) => {
  const { period } = req.query; // e.g., "week", "month", "year"
  const merchantId = req.merchant_user_id;

  try {
    const now = new Date();
    let startDate;

    // Determine the start date based on the period
    if (period === "week") {
      const dayOfWeek = now.getDay(); // Get the current day of the week
      startDate = new Date(now.setDate(now.getDate() - dayOfWeek)); // Start of this week
    } else if (period === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
    } else if (period === "year") {
      startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
    } else {
      return res.status(400).json({ message: "Invalid period specified" });
    }

    // Fetch all refunds within the current period for the merchant
    const refunds = await Transaction.find({
      transaction_type: "Refund",
      from_wallet_id: { $exists: true }, // Ensures it's a wallet transaction
      to_wallet_id: { $exists: true },
      created_at: { $gte: startDate }, // Only transactions within the specified timeframe
    });

    // Calculate the total refunded amount
    const totalRefunded = refunds.reduce(
      (sum, refund) => sum + refund.amount,
      0
    );

    // Fetch refunds for the previous period for comparison
    let previousStartDate, previousEndDate;
    if (period === "week") {
      previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 7); // Start of last week
      previousEndDate = new Date(startDate);
      previousEndDate.setDate(startDate.getDate() - 1); // End of last week
    } else if (period === "month") {
      previousStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        1
      ); // Start of last month
      previousEndDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        0
      ); // End of last month
    } else if (period === "year") {
      previousStartDate = new Date(startDate.getFullYear() - 1, 0, 1); // Start of last year
      previousEndDate = new Date(startDate.getFullYear() - 1, 11, 31); // End of last year
    }

    const previousRefunds = await Transaction.find({
      transaction_type: "Refund",
      from_wallet_id: { $exists: true },
      to_wallet_id: { $exists: true },
      created_at: { $gte: previousStartDate, $lte: previousEndDate }, // Only transactions in the previous period
    });

    // Calculate the total refunded amount in the previous period
    const previousTotalRefunded = previousRefunds.reduce(
      (sum, refund) => sum + refund.amount,
      0
    );

    // Calculate the percentage change
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0; // Avoid division by zero
      return ((current - previous) / previous) * 100;
    };

    const refundChangePercentage = calculatePercentageChange(
      totalRefunded,
      previousTotalRefunded
    );

    // Send response
    res.status(200).json({
      period,
      totalRefunded,
      previousTotalRefunded,
      refundChangePercentage, // Percentage change from the previous period
    });
  } catch (error) {
    console.error("Error fetching refund metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/metrics/revenue", apiAuth, async (req, res) => {
  const { period } = req.query; // e.g., "week", "month", "year"
  const merchantId = req.merchant_user_id;

  try {
    const now = new Date();
    let startDate;

    // Determine the start date based on the period
    if (period === "week") {
      const dayOfWeek = now.getDay(); // Get the current day of the week
      startDate = new Date(now.setDate(now.getDate() - dayOfWeek)); // Start of this week
    } else if (period === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of this month
    } else if (period === "year") {
      startDate = new Date(now.getFullYear(), 0, 1); // Start of this year
    } else {
      return res.status(400).json({ message: "Invalid period specified" });
    }

    // Fetch all completed payment transactions within the current period where the merchant is the recipient
    const transactions = await Transaction.find({
      transaction_type: "Payment",
      status: "Completed",
      to_wallet_id: { $exists: true }, // Ensures the transaction has a valid recipient wallet
      reciever_name: { $exists: true }, // Only transactions with a recipient name
      created_at: { $gte: startDate }, // Only transactions within the specified timeframe
    });

    // Calculate the total revenue for the current period
    const totalRevenue = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Fetch transactions for the previous period for comparison
    let previousStartDate, previousEndDate;
    if (period === "week") {
      previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 7); // Start of last week
      previousEndDate = new Date(startDate);
      previousEndDate.setDate(startDate.getDate() - 1); // End of last week
    } else if (period === "month") {
      previousStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        1
      ); // Start of last month
      previousEndDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        0
      ); // End of last month
    } else if (period === "year") {
      previousStartDate = new Date(startDate.getFullYear() - 1, 0, 1); // Start of last year
      previousEndDate = new Date(startDate.getFullYear() - 1, 11, 31); // End of last year
    }

    const previousTransactions = await Transaction.find({
      transaction_type: "Payment",
      status: "Completed",
      to_wallet_id: { $exists: true },
      reciever_name: { $exists: true },
      created_at: { $gte: previousStartDate, $lte: previousEndDate },
    });

    // Calculate the total revenue for the previous period
    const previousTotalRevenue = previousTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Calculate the percentage change
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0; // Avoid division by zero
      return ((current - previous) / previous) * 100;
    };

    const revenueChangePercentage = calculatePercentageChange(
      totalRevenue,
      previousTotalRevenue
    );

    // Send response
    res.status(200).json({
      period,
      totalRevenue,
      previousTotalRevenue,
      revenueChangePercentage, // Percentage change from the previous period
    });
  } catch (error) {
    console.error("Error fetching revenue metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
