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

router.post("/deposit", apiAuth, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.user_id; // This will work now for both merchants and customers.

  try {
    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    // Fetch the user's wallet
    const wallet = await Wallet.findOne({ user_id: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Update the wallet balance
    wallet.balance += amount;
    await wallet.save();

    // Save the deposit transaction
    const transaction = await saveTransaction(
      "External deposit", // No "from wallet" since it's an external deposit
      wallet.wallet_id,
      amount,
      "Deposit",
      "Completed",
      `Deposit of MWK ${amount}`,
      "External deposit",
      req.user.full_name
    );

    res.status(200).json({
      message: "Deposit successful",
      transaction,
    });
  } catch (error) {
    console.error("Error processing deposit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/withdraw", apiAuth, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.user_id; // This will work now for both merchants and customers.

  try {
    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    // Fetch the user's wallet
    const wallet = await Wallet.findOne({ user_id: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Check if the wallet has sufficient balance
    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the wallet balance
    wallet.balance -= amount;
    await wallet.save();

    // Save the withdrawal transaction
    const transaction = await saveTransaction(
      wallet.wallet_id,
      "External withdrawal", // No "to wallet" since it's an external withdrawal
      amount,
      "Withdrawal",
      "Completed",
      `Withdrawal of $${amount}`,
      req.user.full_name, // Handle Merchant/Customer differently
      "External withdrawal" // No receiver for withdrawal
    );

    res.status(200).json({
      message: "Withdrawal successful",
      transaction,
    });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/balance", apiAuth, async (req, res) => {
  const userId = req.user.user_id; // Access the user ID from the authenticated user

  try {
    // Fetch the user's wallet
    const wallet = await Wallet.findOne({ user_id: userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Respond with the wallet balance
    res.status(200).json({
      message: "Wallet balance retrieved successfully",
      balance: wallet.balance,
    });
  } catch (error) {
    console.error("Error retrieving wallet balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
