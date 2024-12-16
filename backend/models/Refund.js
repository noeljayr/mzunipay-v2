const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const refundSchema = new mongoose.Schema({
  refund_id: { type: String, default: uuidv4, unique: true },
  original_transaction_id: { type: String, required: true },
  refunded_by: { type: String, required: true },
  refund_amount: { type: Number, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Rejected"],
    default: "Pending",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Refund", refundSchema);
