import React from "react";
import { 
  Trash2, 
  Edit3, 
  Eye, 
  Info, 
  Search, 
  Filter, 
  Calendar, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

function ExpenseList({ 
  expenses, 
  loading, 
  deletingId, 
  onView, 
  onEdit, 
  onDelete,
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onResetFilters,
  page,
  totalPages,
  totalCount,
  limit,
  onPageChange,
  onLimitChange
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

  const hasActiveFilters = search || (categoryFilter && categoryFilter !== "All") || startDate || endDate;

  const startItem = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  return (
    <main className="glass-card" style={{ minHeight: "300px", display: "flex", flexDirection: "column" }}>
      <div className="card-title" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>Recent Expenses</span>
          <span 
            style={{ 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              color: "var(--text-secondary)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: "0.15rem 0.5rem",
              borderRadius: "999px",
              border: "1px solid var(--border-color)"
            }}
          >
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={onResetFilters} 
            className="btn-icon"
            style={{ 
              fontSize: "0.75rem", 
              color: "var(--color-primary)", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.25rem",
              padding: "0.2rem 0.5rem",
              border: "1px solid var(--border-color)",
              borderRadius: "6px"
            }}
            title="Reset filters"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Bar */}
      <div className="filter-bar">
        {/* Searchbar */}
        <div className="filter-search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search description..." 
            value={search} 
            onChange={(e) => onSearchChange(e.target.value)} 
            className="filter-input search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="filter-item">
          <Filter size={14} className="filter-icon" />
          <select 
            value={categoryFilter} 
            onChange={(e) => onCategoryFilterChange(e.target.value)} 
            className="filter-input select-input"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="filter-item">
          <Calendar size={14} className="filter-icon" />
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => onStartDateChange(e.target.value)} 
            className="filter-input date-input" 
            title="Start Date"
          />
        </div>

        {/* End Date */}
        <div className="filter-item">
          <Calendar size={14} className="filter-icon" />
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => onEndDateChange(e.target.value)} 
            className="filter-input date-input" 
            title="End Date"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "220px" }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              border: "3px solid var(--border-color)", 
              borderTopColor: "var(--color-primary)", 
              borderRadius: "50%", 
              animation: "floatOrb 1.5s infinite linear" 
            }}></div>
          </div>
        ) : expenses.length === 0 ? (
          <div className="no-data-msg">
            <Info size={32} color="var(--text-secondary)" />
            <p>
              {hasActiveFilters 
                ? "No expenses match your current filters." 
                : "No expenses recorded yet. Fill the form to add one."}
            </p>
            {hasActiveFilters && (
              <button 
                onClick={onResetFilters} 
                className="btn-primary" 
                style={{ width: "auto", marginTop: "0.5rem", padding: "0.4rem 1rem" }}
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-wrapper desktop-expense-table">
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

            {/* Mobile Card View */}
            <div className="mobile-expense-cards">
              {expenses.map((expense) => (
                <div 
                  key={expense._id} 
                  className={`mobile-expense-card ${deletingId === expense._id ? "deleting" : ""}`}
                >
                  <div className="mobile-card-top">
                    <span className="mobile-card-title">{expense.description}</span>
                    <span className="mobile-card-amount">
                      ₹{parseFloat(expense.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="mobile-card-meta">
                    <span className={`category-badge ${getCategoryClass(expense.category)}`}>
                      <span className="badge-dot"></span>
                      {expense.category}
                    </span>
                    <span className="mobile-card-date">
                      {new Date(expense.date).toLocaleDateString("en-IN", { 
                        day: "numeric", 
                        month: "short", 
                        year: "numeric" 
                      })}
                    </span>
                  </div>

                  <div className="mobile-card-actions">
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls Bar */}
      {totalCount > 0 && (
        <div className="pagination-bar">
          <div className="pagination-info">
            Showing <strong>{startItem}</strong> - <strong>{endItem}</strong> of <strong>{totalCount}</strong> expenses
          </div>

          <div className="pagination-controls">
            <div className="limit-selector">
              <label htmlFor="items-per-page">Per page:</label>
              <select 
                id="items-per-page"
                value={limit} 
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="limit-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="page-buttons">
              <button 
                onClick={() => onPageChange(page - 1)} 
                disabled={page <= 1} 
                className="btn-pagination"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="page-indicator">
                Page {page} of {totalPages}
              </span>

              <button 
                onClick={() => onPageChange(page + 1)} 
                disabled={page >= totalPages} 
                className="btn-pagination"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ExpenseList;
