const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const MerchantAPI = require("../models/MerchantAPI");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

const avatars = [
  "bee",
  "butterfly",
  "chameleon",
  "crab",
  "flower-pot",
  "perch",
  "rubber-ring",
  "seal",
  "snail",
  "squirrel",
  "sun",
  "turtle",
  "bear",
];

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Fetch wallet associated with the user
    const wallet = await Wallet.findOne({ user_id: user.user_id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Create JWT Token

    const payload = {
      user_id: user.user_id,
      account_type: user.account_type,
      wallet_id: wallet.wallet_id,
      full_name: user.first_name + " " + user.last_name,
      avatar: user.avatar,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1232320h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

function generateWalletId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, phone, password, account_type } =
    req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Assign a random avatar
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      phone,
      password,
      account_type: account_type || "Customer", // Default to Customer if not specified
      avatar: randomAvatar,
    });

    // Save user to database (password will be hashed due to pre-save middleware)
    await newUser.save();

    // Create a wallet for the user
    const newWallet = new Wallet({
      user_id: newUser.user_id,
      wallet_id: generateWalletId(),
    });
    await newWallet.save();

    // If account type is Merchant, create an API key
    if (newUser.account_type === "Merchant") {
      const newApi = new MerchantAPI({
        merchant_user_id: newUser.user_id,
        api_key: uuidv4(),
      });
      await newApi.save();
    }

    res.status(201).json({ message: "Welcome to MzuniPay!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Upgrade Customer to Merchant
router.post("/upgrade-to-merchant", async (req, res) => {
  const { user_id } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already a merchant
    if (user.account_type === "Merchant") {
      return res.status(400).json({ message: "User is already a merchant" });
    }

    // Update the account type to Merchant
    user.account_type = "Merchant";
    await user.save();

    // Create a Merchant API key
    const newApi = new MerchantAPI({
      merchant_user_id: user.user_id,
      api_key: uuidv4(),
    });
    await newApi.save();

    res
      .status(200)
      .json({ message: "Account upgraded to merchant successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/downgrade-from-merchant", async (req, res) => {
  const { user_id } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is actually a merchant
    if (user.account_type !== "Merchant") {
      return res.status(400).json({ message: "User is not a merchant" });
    }

    // Downgrade the account type (change to "Customer" or another type as desired)
    user.account_type = "Customer";
    await user.save();

    // Find the active Merchant API key for this user and mark it as Revoked.
    // Note: If you allow multiple keys per merchant, consider using updateMany.
    const apiKeyRecord = await MerchantAPI.findOne({
      merchant_user_id: user.user_id,
      status: "Active",
    });

    if (apiKeyRecord) {
      apiKeyRecord.status = "Revoked";
      apiKeyRecord.updated_at = Date.now();
      await apiKeyRecord.save();
    }

    res
      .status(200)
      .json({ message: "Account downgraded from merchant successfully" });
  } catch (error) {
    console.error("Error downgrading account: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit User Information
router.put("/edit-user", async (req, res) => {
  const { first_name, last_name, phone, email, avatar } = req.body;

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

    // Update user information if provided
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (avatar) user.avatar = avatar;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    // If a new password is provided, hash it before saving

    // Save updated user information
    await user.save();

    const wallet = await Wallet.findOne({ user_id: user.user_id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const payload = {
      user_id: user.user_id,
      account_type: user.account_type,
      wallet_id: wallet.wallet_id,
      full_name: user.first_name + " " + user.last_name,
      avatar: user.avatar,
      email: user.email,
    };

    const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1232320h",
    });

    res.status(200).json({
      message: "Update successfully",
      token: newToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-password", async (req, res) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // Get current and new passwords from the request body
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({
          message: "Both currentPassword and newPassword are required.",
        });
    }

    // Find the user in the database
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided current password matches the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    // Hash the new password and update the user's password field
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, new_password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    user.password = new_password;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get-user-info", async (req, res) => {
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

    // Find the wallet associated with the user
    const wallet = await Wallet.findOne({ user_id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Respond with user and wallet information
    res.status(200).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        account_type: user.account_type,
        avatar: user.avatar,
      },
      wallet: {
        wallet_id: wallet.wallet_id,
        balance: wallet.balance,
        currency: wallet.currency,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { query, page = 1 } = req.query;

    // Ensure a query parameter is provided
    if (!query) {
      return res
        .status(400)
        .json({ message: "Please provide a query parameter" });
    }

    const cacheKey = `users_${query}_page_${page}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    let users = [];

    if (query.includes("@")) {
      // Query looks like an email (partial match)
      users = await User.find({ email: new RegExp(query, "i") }); // Case-insensitive partial match
    } else if (/^\d+$/.test(query)) {
      // Query looks like a wallet ID (partial match allowed)
      const wallets = await Wallet.find({ wallet_id: new RegExp(query, "i") });
      const userIds = wallets.map((wallet) => wallet.user_id);
      users = await User.find({ user_id: { $in: userIds } });
    } else {
      // Query could be part of a name (first_name or last_name)
      users = await User.find({
        $or: [
          { first_name: new RegExp(query, "i") },
          { last_name: new RegExp(query, "i") },
        ],
      });
    }

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // Pagination
    const pageSize = 5;
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / pageSize);
    const currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure valid page number

    const paginatedUsers = users.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    // Fetch wallet information for each user
    const userWithWallets = await Promise.all(
      paginatedUsers.map(async (user) => {
        const wallet = await Wallet.findOne({ user_id: user.user_id });
        return {
          user: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            account_type: user.account_type,
            avatar: user.avatar,
          },
          wallet: wallet
            ? {
                wallet_id: wallet.wallet_id,
                balance: wallet.balance,
                currency: wallet.currency,
              }
            : null,
        };
      })
    );

    const response = {
      currentPage,
      totalPages,
      totalUsers,
      users: userWithWallets,
    };

    // Cache the response
    cache.set(cacheKey, response);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
