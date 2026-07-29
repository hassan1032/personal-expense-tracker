  import React, { useState, useEffect } from "react";
import { 
  getExpenses, 
  createExpense, 
  deleteExpense, 
  updateExpense 
} from "./services/api.js";
import { Sparkles, Sun, Moon } from "lucide-react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import ExpenseModal from "./components/ExpenseModal.jsx";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [viewingExpense, setViewingExpense] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0]
  });

  const [status, setStatus] = useState({
    success: null,
    message: ""
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      if (res.success) {
        setExpenses(res.data);
      }
    } catch (err) {
      console.error(err);
      showStatus(false, "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (isSuccess, text) => {
    setStatus({ success: isSuccess, message: text });
    setTimeout(() => {
      setStatus({ success: null, message: "" });
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.description || !form.category) {
      showStatus(false, "Please fill in all required fields");
      return;
    }

    if (parseFloat(form.amount) <= 0) {
      showStatus(false, "Amount must be greater than zero");
      return;
    }

    try {
      if (editingId) {
        const res = await updateExpense(editingId, form);
        if (res.success) {
          showStatus(true, "Expense updated successfully");
          setEditingId(null);
        }
      } else {
        const res = await createExpense(form);
        if (res.success) {
          showStatus(true, "Expense added successfully");
        }
      }

      setForm({
        amount: "",
        description: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0]
      });
      fetchExpenses();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Something went wrong";
      showStatus(false, msg);
    }
  };

  const handleDeleteClick = async (id) => {
    setDeletingId(id);
    setTimeout(async () => {
      try {
        const res = await deleteExpense(id);
        if (res.success) {
          showStatus(true, "Expense deleted successfully");
          fetchExpenses();
        }
      } catch (err) {
        console.error(err);
        showStatus(false, "Failed to delete expense");
      } finally {
        setDeletingId(null);
      }
    }, 400);
  };

  const handleEditClick = (expense) => {
    setEditingId(expense._id);
    setForm({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.date ? expense.date.split("T")[0] : new Date().toISOString().split("T")[0]
    });
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      amount: "",
      description: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0]
    });
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    <div className="app-container">
      <div className="ambient-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <header className="dashboard-header">
        <div className="header-title-area">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={22} color="var(--color-primary)" />
            <h1 className="app-title">Personal Expense Tracker</h1>
          </div>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="total-spent-card">
          <span className="total-spent-label">Total Spent</span>
          <span className="total-spent-amount">
            ₹{totalSpent.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </header>

      <div className="dashboard-grid">
        <ExpenseForm 
          form={form}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancelEdit={cancelEdit}
          status={status}
        />

        <ExpenseList 
          expenses={expenses}
          loading={loading}
          deletingId={deletingId}
          onView={setViewingExpense}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      <ExpenseModal 
        expense={viewingExpense}
        onClose={() => setViewingExpense(null)}
      />
    </div>
  );
}

export default App;
