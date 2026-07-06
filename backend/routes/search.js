const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Search users by name, skills or interests
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword || '';

    const users = await User.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { skills: { $regex: keyword, $options: 'i' } },
        { interests: { $regex: keyword, $options: 'i' } },
      ],
    }).select('-password');

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
