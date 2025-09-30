const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  category: { type: String, default: 'Other' },
  date: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
