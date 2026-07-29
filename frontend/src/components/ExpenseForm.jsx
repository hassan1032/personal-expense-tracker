import React from "react";
import { PlusCircle } from "lucide-react";

function ExpenseForm({ 
  form, 
  onChange, 
  onSubmit, 
  editingId, 
  onCancelEdit, 
  status 
}) {
  return (
    <aside className="glass-card">
      <h2 className="card-title">{editingId ? "Edit Expense" : "Add New Expense"}</h2>
      
      {status.message && (
        <div className={`status-banner ${status.success ? "status-success" : "status-error"}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">Amount (₹) *</label>
          <input 
            type="number" 
            step="0.01" 
            name="amount" 
            value={form.amount} 
            onChange={onChange} 
            className="form-input" 
            placeholder="e.g. 250.00" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <input 
            type="text" 
            name="description" 
            value={form.description} 
            onChange={onChange} 
            className="form-input" 
            placeholder="e.g. Weekly grocery shopping" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={onChange} 
            className="form-input"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date *</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={onChange} 
            className="form-input" 
            required 
          />
        </div>

        <button type="submit" className="btn-primary">
          <PlusCircle size={18} />
          <span>{editingId ? "Update Expense" : "Add Expense"}</span>
        </button>

        {editingId && (
          <button 
            type="button" 
            onClick={onCancelEdit} 
            className="btn-primary" 
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.05)", 
              border: "1px solid var(--border-color)", 
              color: "var(--text-primary)", 
              marginTop: "0.75rem" 
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </aside>
  );
}

export default ExpenseForm;
