import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Summary from "./components/Summary.jsx";
import { CATEGORIES } from "./constants.js";

export default function App() {
  // useState: expenses list, loading/error state, filter + search
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // useRef: used by the form to focus the title field
  const titleRef = useRef(null);

  // useEffect: fetch data from a mock API (public/mock-expenses.json)
  useEffect(() => {
    let cancelled = false;

    async function loadExpenses() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}mock-expenses.json`);
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        // small delay so the loading state is visible
        await new Promise((r) => setTimeout(r, 400));
        if (!cancelled) setExpenses(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load expenses");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExpenses();
    return () => {
      cancelled = true;
    };
  }, []);

  // useEffect: focus title field on first render
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // useCallback: stable function references so memoized children don't re-render
  const addExpense = useCallback((expense) => {
    setExpenses((prev) => [{ ...expense, id: Date.now() }, ...prev]);
    titleRef.current?.focus(); // useRef: focus management after submit
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // useMemo: derived data is only recomputed when its inputs change
  const visibleExpenses = useMemo(() => {
    const q = search.trim().toLowerCase();
    return expenses.filter(
      (e) =>
        (filter === "All" || e.category === filter) &&
        (q === "" || e.title.toLowerCase().includes(q))
    );
  }, [expenses, filter, search]);

  const stats = useMemo(() => {
    const total = visibleExpenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = {};
    visibleExpenses.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    return { total, count: visibleExpenses.length, byCategory };
  }, [visibleExpenses]);

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p>Syntecxhub Internship · Web Development · Project 1</p>
      </header>

      <main className="layout">
        <section className="card">
          <h2>Add Expense</h2>
          <ExpenseForm onAdd={addExpense} titleRef={titleRef} />
        </section>

        <section className="card">
          <Summary stats={stats} />
        </section>

        <section className="card wide">
          <div className="toolbar">
            <h2>Expenses</h2>
            <input
              type="search"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search expenses"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {loading && <p className="muted">Loading expenses...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && (
            <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
          )}
        </section>
      </main>
    </div>
  );
}
