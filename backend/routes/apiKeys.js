const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const MerchantAPI = require("../models/MerchantAPI");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  try {
    // Extract user_id from the JWT payload
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Find the user
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is a merchant
    if (user.account_type !== "Merchant") {
      return res
        .status(403)
        .json({ message: "Only merchants can access this resource" });
    }

    // Find all API keys for the merchant
    const apiKeys = await MerchantAPI.find({ merchant_user_id: user_id });

    // Respond with the API keys
    res.status(200).json({ apiKeys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




// Revoke an API Key
router.put("/revoke/:api_key_id", async (req, res) => {
  try {
    // Extract user_id from the JWT payload
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Verify the user is a merchant
    const user = await User.findOne({ user_id });
    if (!user || user.account_type !== "Merchant") {
      return res.status(403).json({ message: "Only merchants can perform this action" });
    }

    // Revoke the API key
    const { api_key_id } = req.params;
    const apiKey = await MerchantAPI.findOne({ api_key_id, merchant_user_id: user_id });

    if (!apiKey) {
      return res.status(404).json({ message: "API key not found" });
    }

    if (apiKey.status === "Revoked") {
      return res.status(400).json({ message: "API key is already revoked" });
    }

    apiKey.status = "Revoked";
    await apiKey.save();

    res.status(200).json({ message: "API key revoked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a New API Key
router.post("/create", async (req, res) => {
  try {
    // Extract user_id from the JWT payload
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Verify the user is a merchant
    const user = await User.findOne({ user_id });
    if (!user || user.account_type !== "Merchant") {
      return res.status(403).json({ message: "Only merchants can perform this action" });
    }

    // Create a new API key
    const newApiKey = new MerchantAPI({
      merchant_user_id: user_id,
      api_key: uuidv4(),
    });

    await newApiKey.save();

    res.status(201).json({ message: "New API key created successfully", apiKey: newApiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Set an API Key as Active
router.put("/activate/:api_key_id", async (req, res) => {
  try {
    // Extract user_id from the JWT payload
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Verify the user is a merchant
    const user = await User.findOne({ user_id });
    if (!user || user.account_type !== "Merchant") {
      return res.status(403).json({ message: "Only merchants can perform this action" });
    }

    const { api_key_id } = req.params;

    // Find the API key to activate
    const apiKeyToActivate = await MerchantAPI.findOne({ api_key_id, merchant_user_id: user_id });

    if (!apiKeyToActivate) {
      return res.status(404).json({ message: "API key not found" });
    }

    if (apiKeyToActivate.status === "Active") {
      return res.status(400).json({ message: "API key is already active" });
    }

    // Deactivate all other keys
    await MerchantAPI.updateMany(
      { merchant_user_id: user_id, status: "Active" },
      { $set: { status: "Revoked" } }
    );

    // Activate the selected key
    apiKeyToActivate.status = "Active";
    await apiKeyToActivate.save();

    res.status(200).json({ message: "API key activated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an API Key
router.delete("/delete/:api_key_id", async (req, res) => {
  try {
    // Extract user_id from the JWT payload
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Verify the user is a merchant
    const user = await User.findOne({ user_id });
    if (!user || user.account_type !== "Merchant") {
      return res.status(403).json({ message: "Only merchants can perform this action" });
    }

    // Find and delete the API key
    const { api_key_id } = req.params;
    const apiKey = await MerchantAPI.findOneAndDelete({ api_key_id, merchant_user_id: user_id });

    if (!apiKey) {
      return res.status(404).json({ message: "API key not found" });
    }

    res.status(200).json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
