import { useState } from "react";
import { CATEGORIES } from "../constants.js";

const emptyForm = {
  title: "",
  amount: "",
  category: CATEGORIES[0],
  date: new Date().toISOString().slice(0, 10),
};

export default function ExpenseForm({ onAdd, titleRef }) {
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);

    if (!form.title.trim()) {
      setFormError("Please enter a title.");
      titleRef.current?.focus();
      return;
    }
    if (!amount || amount <= 0) {
      setFormError("Amount must be greater than 0.");
      return;
    }

    setFormError("");
    onAdd({
      title: form.title.trim(),
      amount,
      category: form.category,
      date: form.date,
    });
    setForm({ ...emptyForm, category: form.category });
  };

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <label>
        Title
        <input
          ref={titleRef}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Lunch"
        />
      </label>

      <label>
        Amount (₹)
        <input
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
        />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input name="date" type="date" value={form.date} onChange={handleChange} />
      </label>

      {formError && <p className="error">{formError}</p>}
      <button type="submit" className="btn primary">
        Add Expense
      </button>
    </form>
  );
}
