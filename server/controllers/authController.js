import usrModel from "../models/usrModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    console.log("req.body:", req.body);

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for existing user
    const existingUser = await usrModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // const hashedPassword = await hashPassword(password);
    const user = await new usrModel({
      name,
      email,
      phone,
      address,
      password,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration.",
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
    console.log("user:", user);

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
        address: user.address,
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
