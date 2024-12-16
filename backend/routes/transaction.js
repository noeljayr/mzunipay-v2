const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const Refund = require("../models/Refund");
const { apiAuth } = require("../middleware/apiAuth");
const MerchantCustomerLog = require("../models/MerchantCustomerLog");

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

const updateMerchantCustomerLog = async (merchantId, customerId) => {
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
      transaction_count: 1,
    });
    await newLog.save();
  }
};

router.post("/transfer", apiAuth, async (req, res) => {
  const { sender_wallet_id, receiver_identifier, amount, description } =
    req.body;

  try {
    // Validate input
    if (!sender_wallet_id || !receiver_identifier || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Fetch sender's wallet and user
    const senderWallet = await Wallet.findOne({ wallet_id: sender_wallet_id });
    if (!senderWallet) {
      return res.status(404).json({ message: "Sender wallet not found" });
    }
    const senderName = await getUserFullName(senderWallet.user_id);

    // Fetch receiver's wallet and user by wallet ID or email
    let receiverWallet, receiverUser;
    let receiverName = null;
    if (receiver_identifier.includes("@")) {
      receiverUser = await User.findOne({ email: receiver_identifier });
      if (!receiverUser) {
        return res.status(404).json({ message: "Receiver not found" });
      }
      receiverWallet = await Wallet.findOne({ user_id: receiverUser.user_id });
      receiverName = await getUserFullName(receiverUser.user_id);
    } else {
      receiverWallet = await Wallet.findOne({ wallet_id: receiver_identifier });
      if (receiverWallet) {
        receiverUser = await User.findOne({ user_id: receiverWallet.user_id });
      }
    }

    if (!receiverWallet || !receiverUser) {
      return res.status(404).json({ message: "Receiver wallet not found" });
    }

    // Check if sender has sufficient balance
    if (senderWallet.balance < amount) {
      await saveTransaction(
        senderWallet.wallet_id,
        receiverWallet.wallet_id,
        amount,
        "Peer-to-Peer",
        "Failed",
        description,
        senderName,
        receiverName
      );
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Start transaction (atomic operation)
    const session = await Wallet.startSession();
    session.startTransaction();

    try {
      // Deduct amount from sender
      senderWallet.balance -= amount;
      await senderWallet.save({ session });

      // Add amount to receiver
      receiverWallet.balance += amount;
      await receiverWallet.save({ session });

      // Save successful transaction
      const transaction = await saveTransaction(
        senderWallet.wallet_id,
        receiverWallet.wallet_id,
        amount,
        "Peer-to-Peer",
        "Completed",
        description,
        senderName,
        receiverName
      );

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        message: "Transfer successful",
        transaction,
      });
    } catch (error) {
      // Rollback transaction in case of failure
      await session.abortTransaction();
      session.endSession();
      console.error("Error during transfer:", error);
      return res.status(500).json({ message: "Transfer failed" });
    }
  } catch (error) {
    console.error("Error processing transfer:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", apiAuth, async (req, res) => {
  const {
    limit,
    page,
    sort_by = "created_at",
    sort_order = "desc",
    search,
  } = req.query;
  const pageNumber = parseInt(page, 10) || 1; // Default to page 1
  const pageSize = parseInt(limit, 10) || 10; // Default to 10 transactions per page
  const sortOrder = sort_order.toLowerCase() === "asc" ? 1 : -1; // Sort order: ascending or descending

  try {
    let walletId;
    let filter = {};

    if (req.user && req.user.account_type !== "Admin") {
      // If authenticated as a customer or merchant (non-admin)
      const userWallet = await Wallet.findOne({ user_id: req.user.user_id });
      if (!userWallet) {
        return res.status(404).json({ message: "Wallet not found for user" });
      }
      walletId = userWallet.wallet_id;

      // Filter for transactions involving the user's wallet
      filter = {
        $or: [{ to_wallet_id: walletId }, { from_wallet_id: walletId }],
      };
    } else if (req.user && req.user.account_type === "Admin") {
      // Admin can see all transactions, no wallet filter needed
      filter = {};
    } else {
      return res
        .status(400)
        .json({ message: "Unable to determine user context" });
    }

    // Apply search filters
    if (search) {
      const searchRegex = new RegExp(search, "i");

      // Fetch the user's full name to disregard their name in search
      let userFullName = "";
      if (req.user && req.user.account_type !== "Admin") {
        const user = await User.findOne({ user_id: req.user.user_id });
        userFullName = `${user.first_name} ${user.last_name}`;
      }

      const searchFilters = [
        { sender_name: { $regex: searchRegex, $ne: userFullName } },
        { receiver_name: { $regex: searchRegex, $ne: userFullName } },
      ];

      // Add numeric search for amount, only if `search` is a number
      const parsedAmount = parseFloat(search);
      if (!isNaN(parsedAmount)) {
        searchFilters.push({ amount: parsedAmount });
      }

      // Merge existing $or filter with search filters
      if (filter.$or) {
        filter.$and = [{ $or: filter.$or }, { $or: searchFilters }];
        delete filter.$or; // Clean up top-level $or
      } else {
        filter.$or = searchFilters;
      }
    }

    console.log("Transaction filter applied:", filter);

    // Fetch transactions with pagination, sorting, and filtering
    const transactions = await Transaction.find(filter)
      .sort({ [sort_by]: sortOrder })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Get the total count of transactions for pagination metadata
    const totalTransactions = await Transaction.countDocuments(filter);

    return res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalTransactions / pageSize),
        totalTransactions,
      },
    });
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/refund", apiAuth, async (req, res) => {
  const { original_transaction_id, refund_amount, reason } = req.body;
  const refunded_by = req.user.user_id; // Assuming user info is available in the request after auth middleware

  try {
    // Validate input
    if (
      !original_transaction_id ||
      !refund_amount ||
      refund_amount <= 0 ||
      !reason
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Fetch the original transaction
    const originalTransaction = await Transaction.findOne({
      tx_id: original_transaction_id,
    });
    if (!originalTransaction) {
      return res
        .status(404)
        .json({ message: "Original transaction not found" });
    }

    // Check if the refund amount is valid
    if (refund_amount > originalTransaction.amount) {
      return res
        .status(400)
        .json({ message: "Refund amount exceeds original transaction amount" });
    }

    // Fetch sender and receiver wallets
    const senderWallet = await Wallet.findOne({
      wallet_id: originalTransaction.to_wallet_id,
    });
    const receiverWallet = await Wallet.findOne({
      wallet_id: originalTransaction.from_wallet_id,
    });

    if (!senderWallet || !receiverWallet) {
      return res
        .status(404)
        .json({ message: "Wallets involved in the transaction not found" });
    }

    // Start transaction (atomic operation)
    const session = await Wallet.startSession();
    session.startTransaction();

    try {
      // Deduct refund amount from receiver (who initially received the funds)
      if (receiverWallet.balance < refund_amount) {
        return res.status(400).json({
          message:
            "Insufficient balance in receiver's wallet to process the refund",
        });
      }
      receiverWallet.balance -= refund_amount;
      await receiverWallet.save({ session });

      // Add refund amount back to sender's wallet
      senderWallet.balance += refund_amount;
      await senderWallet.save({ session });

      // Create refund record
      const refund = new Refund({
        original_transaction_id,
        refunded_by,
        refund_amount,
        reason,
        status: "Completed",
      });
      await refund.save({ session });

      // Save refund transaction record
      await saveTransaction(
        receiverWallet.wallet_id,
        senderWallet.wallet_id,
        refund_amount,
        "Refund",
        "Completed",
        `Refund for transaction ${original_transaction_id}`,
        originalTransaction.reciever_name,
        originalTransaction.sender_name
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        message: "Refund processed successfully",
        refund,
      });
    } catch (error) {
      // Rollback transaction in case of failure
      await session.abortTransaction();
      session.endSession();
      console.error("Error during refund:", error);
      return res.status(500).json({ message: "Refund failed" });
    }
  } catch (error) {
    console.error("Error processing refund:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;