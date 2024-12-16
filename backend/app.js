const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");
const merchantRoutes = require("./routes/merchant");
const walletRoutes = require("./routes/wallet");
const apiRoutes = require("./routes/apiKeys")
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"], // Specify allowed headers
  })
);

app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/api-keys", apiRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
