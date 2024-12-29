import express from 'express';
import {registerController,loginController,getUserTransactions,deleteTransaction,updateTransaction,addTransaction, addFeedback, verifyToken} from '../controllers/authController.js'

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.post("/transaction", addTransaction);
router.post("/feedback", addFeedback)

// Get transactions for a specific user
router.get("/transactions", getUserTransactions);

// Delete a transaction
router.delete("/delete/:transactionId", deleteTransaction);

// Update a transaction
router.put("/update/:transactionId", updateTransaction);

//verifyToken

router.post("/verifyToken", verifyToken);

export default router;