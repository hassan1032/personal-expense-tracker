import React from "react";
import { Trash2, Edit3, Eye, Info } from "lucide-react";

function ExpenseList({ 
  expenses, 
  loading, 
  deletingId, 
  onView, 
  onEdit, 
  onDelete 
}) {
  const getCategoryClass = (cat) => {
    const mapping = {
      Food: "badge-food",
      Travel: "badge-travel",
      Shopping: "badge-shopping",
      Bills: "badge-bills",
      Entertainment: "badge-entertainment"
    };
    return mapping[cat] || "badge-other";
  };

  return (
    <main className="glass-card" style={{ minHeight: "300px" }}>
      <h2 className="card-title">Recent Expenses</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <div style={{ 
            width: "30px", 
            height: "30px", 
            border: "3px solid var(--border-color)", 
            borderTopColor: "var(--color-primary)", 
            borderRadius: "50%", 
            animation: "floatOrb 1.5s infinite linear" 
          }}></div>
        </div>
      ) : expenses.length === 0 ? (
        <div className="no-data-msg">
          <Info size={32} color="var(--text-secondary)" />
          <p>No expenses recorded yet. Fill the form to add one.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr 
                  key={expense._id} 
                  className={`expense-row ${deletingId === expense._id ? "deleting" : ""}`}
                >
                  <td>{expense.description}</td>
                  <td>
                    <span className={`category-badge ${getCategoryClass(expense.category)}`}>
                      <span className="badge-dot"></span>
                      {expense.category}
                    </span>
                  </td>
                  <td>
                    {new Date(expense.date).toLocaleDateString("en-IN", { 
                      day: "numeric", 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </td>
                  <td className="amount-text">
                    ₹{parseFloat(expense.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
                      <button 
                        onClick={() => onView(expense)} 
                        className="btn-icon btn-view" 
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => onEdit(expense)} 
                        className="btn-icon btn-edit" 
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(expense._id)} 
                        className="btn-icon btn-delete" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default ExpenseList;
