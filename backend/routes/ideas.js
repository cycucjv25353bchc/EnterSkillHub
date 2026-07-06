const express = require('express');
const BusinessIdea = require('../models/BusinessIdea');

const router = express.Router();

// Get all business ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await BusinessIdea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new business idea
router.post('/', async (req, res) => {
  try {
    const { title, description, skills, category } = req.body;

    const newIdea = new BusinessIdea({
      title,
      description,
      skills,
      category,
    });

    await newIdea.save();

    res.status(201).json(newIdea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete business idea
router.delete('/:id', async (req, res) => {
  try {
    await BusinessIdea.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Business Idea Deleted Successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
