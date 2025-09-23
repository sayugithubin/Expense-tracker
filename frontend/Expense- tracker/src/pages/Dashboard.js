import { useEffect, useState } from "react";
import { getTransactions } from "../services/firebaseService";
import AddTransaction from "../components/AddTransaction";
import { addTransaction } from "../services/firebaseService";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);

  const fetchData = async () => {
    const data = await getTransactions();
    setTransactions(data);

    const income = data.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expense = data.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

    setInflow(income);
    setOutflow(expense);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (transaction) => {
    await addTransaction(transaction);
    fetchData();
  };

  const chartData = [
    { name: "Inflow", value: inflow },
    { name: "Outflow", value: outflow }
  ];

  const COLORS = ["#16a34a", "#dc2626"]; // green,
