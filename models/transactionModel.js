import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },  // Use String for UUID
    text: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"], // Restrict to "Income" or "Expense"
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 0; // Amount should be greater than zero
        },
        message: (props) => `${props.value} must be greater than zero.`,
      },
    },
    dateoftransaction: {
      type: Date,
      default: Date.now, // Default to the current date
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

export default mongoose.model("Transaction", transactionSchema);
