import { useState } from "react";
import API from "../services/api";

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [currency, setCurrency] = useState("USD");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/expenses", {
      title,
      amount: Number(amount),
      currency,
      category,
      date,
    });
    onAdd(res.data);
    setTitle("");
    setAmount("");
    setCategory("Other");
    setCurrency("USD");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="INR">INR</option>
        <option value="JPY">JPY</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
