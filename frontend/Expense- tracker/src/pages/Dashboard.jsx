import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { getCurrentUser, logout } from "../utils/auth";
import ExpenseForm from "../components/Expenseform";
import ExpenseList from "../components/Expenselist";
import ChartComponent from "../components/ChartComponents";
import { useToast } from "../components/Toast.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const user = getCurrentUser();
  const [budgetInput, setBudgetInput] = useState("");
  const [savedBudget, setSavedBudget] = useState(0);
  const { notify } = useToast();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users", user.uid, "expenses"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
      setExpenses(rows);
    });
    return () => unsub();
  }, [user]);

  // Load saved budget per user from localStorage
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`budget:${user.uid}`);
    if (saved != null) {
      setSavedBudget(Number(saved) || 0);
      setBudgetInput(String(saved));
    }
  }, [user]);

  const handleAdd = async ({ title, amount, category, date, notes }) => {
    if (!user) return;
    await addDoc(collection(db, "users", user.uid, "expenses"), {
      title,
      amount: Number(amount),
      category,
      date: date ? Timestamp.fromDate(new Date(date)) : Timestamp.now(),
      notes: notes || "",
    });
  };

  const handleDelete = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "expenses", id));
  };

  const summary = useMemo(() => {
    const bucket = {};
    for (const e of expenses) {
      const key = e.category || "Other";
      const amt = Number(e.amount || 0);
      bucket[key] = (bucket[key] || 0) + amt;
    }
    return Object.entries(bucket).map(([k, v]) => ({ _id: k, total: v }));
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const b = Number(budgetInput);
    if (!user) return;
    if (!isFinite(b) || b <= 0) {
      notify("Enter a valid budget amount", { type: "error" });
      return;
    }
    setSavedBudget(b);
    localStorage.setItem(`budget:${user.uid}`, String(b));
    if (totalSpent > b) {
      notify("Budget exceeded!", { type: "error" });
    } else {
      notify("Budget set. You're within budget.", { type: "success" });
    }
  };

  return (
    <div>
      <header>
        <h2>Welcome {user?.displayName || user?.email}</h2>
        <button onClick={() => { logout(); window.location.href = "/login"; }}>
          Logout
        </button>
      </header>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="card" style={{ marginBottom: 16, background: "#ffffff", color: "#000000", borderColor: "#e5e7eb" }}>
            <h3>Budget</h3>
            <form onSubmit={handleBudgetSubmit} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="number"
                placeholder="Set monthly budget"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
            <div style={{ marginTop: 8 }}>
              <div>Total spent: ₹{totalSpent}</div>
              {savedBudget > 0 && (
                <div>
                  {totalSpent <= savedBudget
                    ? `Remaining: ₹${savedBudget - totalSpent}`
                    : `Over by: ₹${totalSpent - savedBudget}`}
                </div>
              )}
            </div>
          </div>
          <ExpenseForm onAdd={handleAdd} />
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </div>
        <div style={{ width: 300 }}>
          <ChartComponent data={summary} />
        </div>
      </div>
    </div>
  );
}
