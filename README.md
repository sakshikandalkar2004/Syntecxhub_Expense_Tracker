# Syntecxhub Expense Tracker

Project 1 of the Syntecxhub Web Development internship task, built with React + Vite.

## Features
- Add expenses (title, amount, category, date) with validation
- Delete expenses, search by title, filter by category
- Live summary: total amount and per-category breakdown
- Responsive layout (works on mobile and desktop)

## Hooks used
| Hook | Where / why |
|------|-------------|
| `useState` | Form inputs (`ExpenseForm`), expenses list, loading, error, search and filter (`App`) |
| `useEffect` | Fetches initial data from the mock API `public/mock-expenses.json`; focuses the title field on load |
| `useRef` | `titleRef` focuses the title input on load, after adding an expense, and on validation error |
| `useMemo` | `visibleExpenses` (search + filter) and `stats` (total and category breakdown) |
| `useCallback` | `addExpense` and `deleteExpense`, passed to memoized children (`React.memo` on list rows) |

## Run locally
```bash
npm install
npm run dev      # development server
npm run build    # production build
```

## Project structure
```
src/
  App.jsx                 state, data fetching, memoized values
  constants.js            category list
  styles.css
  components/
    ExpenseForm.jsx
    ExpenseList.jsx
    Summary.jsx
public/
  mock-expenses.json      mock API data
```

## Submission checklist
- [ ] Create GitHub repo named `Syntecxhub_Expense_Tracker` and push all source code
- [ ] Post your internship status on LinkedIn and mention @Syntecxhub
- [ ] Submit the repo link through the official Submission Form
