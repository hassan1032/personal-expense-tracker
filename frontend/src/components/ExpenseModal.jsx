import React, { useEffect } from "react";
import { X } from "lucide-react";

function ExpenseModal({ expense, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (expense) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expense, onClose]);

  if (!expense) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <h3 className="modal-title">Expense Details</h3>
        
        <div className="modal-detail-row">
          <span className="modal-detail-label">Description</span>
          <span className="modal-detail-value">{expense.description}</span>
        </div>

        <div className="modal-detail-row">
          <span className="modal-detail-label">Category</span>
          <span className={`category-badge ${getCategoryClass(expense.category)}`} style={{ margin: 0 }}>
            <span className="badge-dot"></span>
            {expense.category}
          </span>
        </div>

        <div className="modal-detail-row">
          <span className="modal-detail-label">Date</span>
          <span className="modal-detail-value">
            {new Date(expense.date).toLocaleDateString("en-IN", { 
              weekday: "short", 
              day: "numeric", 
              month: "short", 
              year: "numeric" 
            })}
          </span>
        </div>

        <div className="modal-detail-row" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
          <span className="modal-detail-label">Amount</span>
          <span className="modal-detail-value" style={{ color: "var(--color-primary)", fontSize: "1.25rem", fontWeight: "800" }}>
            ₹{parseFloat(expense.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;
