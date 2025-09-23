export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        expenses.map((e) => (
          <div
            key={e._id}
            style={{ border: "1px solid #ccc", margin: "8px 0", padding: 8 }}
          >
            <div>
              <strong>{e.title}</strong> — ₹{e.amount}
            </div>
            <div>
              {e.category} • {(() => {
                const dateVal = e.date?.toDate ? e.date.toDate() : new Date(e.date);
                return isNaN(dateVal) ? "" : dateVal.toLocaleDateString();
              })()}
            </div>
            <button onClick={() => onDelete(e._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
