import express from "express";
import dotenv from "dotenv";
import connectDB from "./server/config/db.js";
import authRoutes from './server/routes/authRoute.js';
import cors from 'cors';
import path from "path"; // Required to serve static files

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

// Use the CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Log to confirm the server is running
console.log("hereeeeeeeeeeeeeeee");

// API routes
app.use('/api/v1/auth', authRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Get the absolute path of the project
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
