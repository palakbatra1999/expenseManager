import usrModel from "../models/usrModel.js";
import Feedback from "../models/feedbackModel.js";
import jwt from "jsonwebtoken";
import transactionModel from "../models/transactionModel.js";
import { v4 as uuidv4 } from "uuid";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    console.log("req.body from register:", req.body);

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for existing user
    const existingUser = await usrModel.findOne({ email });

    console.log("existingUser from registerController:", existingUser);

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const userId = uuidv4(); // Generate unique userId

    // const hashedPassword = await hashPassword(password);
    const user = await new usrModel({
      _id:  userId,
      userId: userId,
      name,
      email,
      phone,
      address,
      password,
    }).save();

    console.log("user from registerController:", user);

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      user: {
        name,
        email,
        phone
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration.",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Logging in:", email, password);

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await usrModel.findOne({ email });
    console.log("user from loginController:", user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "This user does not exist. Please sign up first.",
      });
    }
    //const match = await bcrypt.compare(password, user.password);
    if (password !==user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful.",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login.",
    });
  }
};




export const addTransaction = async (req, res) => {
 

  console.log("req.body from login addTransaction:", req.body);
  const { userId, text, type, amount } = req.body;


  try {
    // Validate user existence
    const user = await usrModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create a new transaction
    const transaction = new transactionModel({
      userId,
      text,
      type,
      amount,
      dateoftransaction: new Date(),
    });

    // Save the transaction to the database
    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserTransactions = async (req, res) => {
  const { userId } = req.query;

  console.log("userId from getUserTransactions:", req.query);

  try {
    // Validate user existence
    const user = await usrModel.findById(userId);

    console.log("user from getUserTransactions:", user);


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Fetch transactions for the user
    const transactions = await transactionModel.find({ userId: String(userId) }).sort({ dateoftransaction: -1 });
    console.log("transactions from getUserTransactions:", transactions);

    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Find the transaction by ID
    const transaction = await transactionModel.findById(transactionId);

    console.log("transaction from deleteTransaction:", transaction);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Delete the transaction
    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { text, type, amount } = req.body;

  try {
    // Find the transaction by ID
    const transaction = await transactionModel.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Update transaction fields
    if (text) transaction.text = text;
    if (type) transaction.type = type;
    if (amount) transaction.amount = amount;

    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const addFeedback = async(req,res) =>{
  console.log("Feedback added successfully");

  const {name, email, message} = req.body;
  try{
    const feedback = new Feedback({
      name,
      email,
      message,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback added successfully",
      data: feedback,
    });

  } catch(error){

    console.log("error in adding feedback:", error);

  }
}



