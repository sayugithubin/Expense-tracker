import { useState } from "react";
import ChartComponent from "./ChartComponent";
import "./App.css";
import "./ChartComponent.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    setTransactions([...transactions, { text, amount: +amount }]);
    setText("");
    setAmount("");
  };

  // fake summary data for chart
  const summary = [
    { _id: "Food", total: 500 },
    { _id: "Transport", total: 200 },
    { _id: "Shopping", total: 350 },
  ];

  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <h2>💰 Expense Tracker</h2>
        <button>Login</button>
      </div>

      {/* Split front page layout */}
      <div className="frontpage">
        {/* Transactions Section */}
        <div className="card">
          <h3>📝 Transactions</h3>
          <form onSubmit={addTransaction}>
            <input
              type="text"
              placeholder="Enter description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit">Add</button>
          </form>

          <h4 style={{ marginTop: "1rem" }}>History</h4>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            transactions.map((t, i) => (
              <div className="transaction-item" key={i}>
                <span>{t.text}</span>
                <span className="amount">₹{t.amount}</span>
              </div>
            ))
          )}
        </div>

        {/* Chart Section */}
        <ChartComponent data={summary} />
      </div>
    </div>
  );
}

export default App;
