const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Replace with env variable in production

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Signup API
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
// console.log(req.body);
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

module.exports = router;



router.post('/login', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ message: 'Email/Mobile and password are required' });
    }

    // Determine if it's an email or mobile (simple regex for email)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrMobile);
    const whereClause = isEmail ? { email: emailOrMobile } : { mobile: emailOrMobile };

    const user = await User.findOne({ where: whereClause });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token,role:user.role, name:user.fullname, mobile:user.mobile, email:user.email, businessId:businessId });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Token check API
router.get('/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'Token is valid',
    user: req.user // contains { id, role, iat, exp }
  });
});

module.exports = router;
