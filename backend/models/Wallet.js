const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  wallet_id: { type: String, required: true },
  user_id: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: "MWK" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wallet", walletSchema);
