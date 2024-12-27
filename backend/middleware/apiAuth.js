const jwt = require("jsonwebtoken");
const MerchantAPI = require("../models/MerchantAPI");
const User = require("../models/User");

const apiAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const apiKey = req.headers["x-api-key"];

  try {
    if (apiKey) {
      // Validate API key for merchants
      const merchantAPI = await MerchantAPI.findOne({
        api_key: apiKey,
        status: "Active",
      });

      const merchantUser = await User.findOne({
        user_id: merchantAPI.merchant_user_id
      })
      if (!merchantAPI) {
        console.log("Invalid or inactive API key");
        return res.status(401).json({ message: "Invalid or inactive API key" });
      }

      // Populate req.user with merchant data
      req.user = {
        user_id: merchantAPI.merchant_user_id,
        account_type: "Merchant",
        merchant_name: merchantUser.first_name + " " + merchantUser.last_name
      };
      console.log("Merchant user identified:", req.user);
      return next();
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      // Validate Bearer Token for customers/admins
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Assuming token includes user_id and account_type
      console.log("User identified:", req.user);
      return next();
    } else {
      console.log("No authorization token or API key provided");
      return res.status(401).json({
        message: "Unauthorized: No token or API key provided",
      });
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid credentials." });
  }
};

module.exports = { apiAuth };
