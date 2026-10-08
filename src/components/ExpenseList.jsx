import { memo } from "react";

// React.memo + stable onDelete (useCallback in App) => rows only re-render when their data changes
const ExpenseItem = memo(function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="item">
      <div>
        <strong>{expense.title}</strong>
        <span className="meta">
          {expense.category} · {expense.date}
        </span>
      </div>
      <div className="right">
        <span className="amount">₹{expense.amount.toLocaleString("en-IN")}</span>
        <button
          className="btn danger"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.title}`}
        >
          ✕
        </button>
      </div>
    </li>
  );
});

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="muted">No expenses found.</p>;
  }
  return (
    <ul className="list">
      {expenses.map((e) => (
        <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
      ))}
    </ul>
  );
}
