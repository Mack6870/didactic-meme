const express = require('express');
const router = express.Router();

const exampleRoutes = require('./example.routes');

// Mount resource routers here
router.use('/examples', exampleRoutes);

// API root
router.get('/', (_req, res) => {
  res.json({ message: 'API is running', version: '1.0.0' });
});

module.exports = router;
