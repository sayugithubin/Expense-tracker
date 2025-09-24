import { useState } from "react";

export const IncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    addIncome(Number(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter income"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Income</button>
    </form>
  );
};
