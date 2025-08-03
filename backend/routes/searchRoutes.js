const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Save search with lat/lng
router.post("/add", verifyToken, async (req, res) => {
  const { name, lat, lng } = req.body;

  if (!name || !lat || !lng) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Avoid duplicate entries by name+lat+lng
    const alreadyExists = user.searchHistory.some(
      (entry) => entry.name === name && entry.lat === lat && entry.lng === lng
    );

    if (!alreadyExists) {
      user.searchHistory.push({ name, lat, lng });
      await user.save();
    }

    res.status(200).json({ message: "Search added", history: user.searchHistory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get('/get-search-history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ searchHistory: user.searchHistory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
