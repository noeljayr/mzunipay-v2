const mongoose = require("mongoose");

const MerchantCustomerLogSchema = new mongoose.Schema({
  merchant_id: { type: String, required: true }, // Reference to the merchant
  customer_id: { type: String, required: true }, // Reference to the customer
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  first_transaction_date: { type: Date, required: true }, // Date of the first transaction
  last_transaction_date: { type: Date, required: true }, // Date of the most recent transaction
  transaction_count: { type: Number, default: 1 }, // Number of transactions between this customer and merchant
});

module.exports = mongoose.model(
  "MerchantCustomerLog",
  MerchantCustomerLogSchema
);
