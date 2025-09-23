import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { getCurrentUser, logout } from "../utils/auth";
import ExpenseForm from "../components/Expenseform";
import ExpenseList from "../components/Expenselist";
import ChartComponent from "../components/ChartComponents";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users", user.uid, "expenses"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
      setExpenses(rows);
    });
    return () => unsub();
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
