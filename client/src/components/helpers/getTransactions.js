import axios from "axios";
// Fetch transactions for the authenticated user
export const getTransactions = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/auth/transactions?userId=${userId}`
    );

    console.log("response from Transaction helper:", response.data.data);

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error("Failed to fetch transactions");
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};


