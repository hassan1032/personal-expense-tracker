import axios from "axios";

// Environment Switching Configuration:
// 1. FOR LIVE DEPLOYMENT: VITE_API_URL should be set in Netlify dashboard (e.g. https://expense-tracker-backend-nvmg.onrender.com)
// 2. FOR LOCAL DEVELOPMENT: If VITE_API_URL is empty, Vite proxy will redirect "/api" to http://localhost:5000
const BACKEND_URL = import.meta.env.VITE_API_URL || "";

const API_BASE_URL = BACKEND_URL
  ? `${BACKEND_URL}/api/expenses`
  : "/api/expenses";

export const getExpenses = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await axios.post(API_BASE_URL, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, expenseData);
  return response.data;
};
