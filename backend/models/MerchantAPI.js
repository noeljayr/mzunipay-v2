const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const merchantAPISchema = new mongoose.Schema({
  api_key_id: { type: String, default: uuidv4, unique: true },
  merchant_user_id: { type: String, required: true },
  api_key: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Revoked'], default: 'Active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MerchantAPI', merchantAPISchema);
