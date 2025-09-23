import { useState } from "react";

function AddTransaction({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); // default is expense

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
      type
    });
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded shadow">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={(e) => setType(e.target.value)}
          />
          Income
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={(e) => setType(e.target.value)}
          />
          Expense
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction;
