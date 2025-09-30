const express = require('express');
const Expense = require('../backend/models/expense');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

// Get all expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add expense
router.post('/', auth, async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount == null) {
      return res.status(400).json({ msg: 'Title and amount are required' });
    }
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
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: 'Invalid expense id' });
    }
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ msg: 'Not found' });
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    await expense.deleteOne();
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Category summary
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const summary = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
