const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Test Route
router.get('/', (req, res) => {
  res.send('Auth Route Working');
});

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, skills = [], interests = [] } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      skills,
      interests,
    });

    await user.save();

    res.status(201).json({
      message: 'User Registered Successfully',
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Registration Failed',
      error: err.message,
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign({ id: user._id }, 'mysecretkey', {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login Successful',
      token,
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Login Failed',
      error: err.message,
    });
  }
});

module.exports = router;
