const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const MerchantAPI = require("../models/MerchantAPI");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 })

const avatars = [
  "bee",
  "butterfly",
  "dog",
  "fish",
  "flower-pot",
  "fox",
  "frog",
  "hen",
  "hippo",
  "lion",
  "monkey",
  "perch",
  "rabbit",
  "seal",
  "snail",
  "sun",
  "tortoise",
  "turtle",
  "zebra",
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
      wallet_id: wallet.wallet_id, // Add wallet_id to the token payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
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
      return res.status(400).json({ message: "Email already exists" });
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

    res.status(201).json({ message: "User registered successfully" });
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

// Edit User Information
router.put("/edit-user", async (req, res) => {
  const { first_name, last_name, phone, email, avatar, password } = req.body;

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
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save updated user information
    await user.save();

    res.status(200).json({ message: "User information updated successfully" });
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
    user.password = await bcrypt.hash(new_password, 10);

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
      return res.status(400).json({ message: "Please provide a query parameter" });
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

    const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Fetch wallet information for each user
    const userWithWallets = await Promise.all(
      paginatedUsers.map(async (user) => {
        const wallet = await Wallet.findOne({ user_id: user.user_id });
        return {
          user: {
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