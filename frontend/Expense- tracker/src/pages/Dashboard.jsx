import { useEffect, useState } from "react";
import API from "../services/api";
import { getUser, logout } from "../utils/auth";
import ExpenseForm from "../components/Expenseform";
import ExpenseList from "../components/Expenselist";
import ChartComponent from "../components/ChartComponents";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const user = getUser();

  const loadExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  const loadSummary = async () => {
    const res = await API.get("/expenses/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    loadExpenses();
    loadSummary();
  }, []);

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    loadSummary();
  };

  const handleDelete = async (id) => {
    await API.delete(`/expenses/${id}`);
    setExpenses((prev) => prev.filter((e) => e._id !== id));
    loadSummary();
  };

  return (
    <div>
      <header>
        <h2>Welcome {user?.name}</h2>
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
