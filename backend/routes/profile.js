const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Get Logged In User
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'mysecretkey');

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token',
    });
  }
});

// Update Profile
router.put('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'mysecretkey');

    let { name, skills, interests } = req.body;

    if (typeof skills === 'string') {
      skills = skills.split(',').map((item) => item.trim());
    }

    if (typeof interests === 'string') {
      interests = interests.split(',').map((item) => item.trim());
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        name,
        skills,
        interests,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
