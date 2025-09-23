const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all expenses
router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
});

// Add expense
router.post('/', auth, async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const expense = new Expense({
    user: req.user.id,
    title,
    amount,
    category,
    date,
    notes
  });
  await expense.save();
  res.json(expense);
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ msg: 'Not found' });
  if (expense.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
  await expense.deleteOne();
  res.json({ msg: 'Expense removed' });
});

// Category summary
router.get('/summary', auth, async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { user: require('mongoose').Types.ObjectId(req.user.id) } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } }
  ]);
  res.json(summary);
});

module.exports = router;
