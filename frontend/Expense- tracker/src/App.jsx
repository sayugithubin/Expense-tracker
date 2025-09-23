import { useState } from "react";
import "./App.css";

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

  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <h2>💰 Expense Tracker</h2>
        <button>Login</button>
      </div>

      <div className="container">
        {/* Add Transaction */}
        <div className="card">
          <h3>Add Transaction</h3>
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
        </div>

        {/* Transaction List */}
        <div className="card">
          <h3>Transaction History</h3>
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
      </div>
    </div>
  );
}

export default App;
