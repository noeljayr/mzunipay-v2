const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const transactionSchema = new mongoose.Schema({
  tx_id: { type: String, default: uuidv4, unique: true },
  to_wallet_id: { type: String, required: true },
  reciever_name: {
    type: String,
    required: true
  },
  sender_name: {
    type: String,
    required: true
  },
  from_wallet_id: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  transaction_type: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);


