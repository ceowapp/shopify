const express = require('express');
const router = express.Router();
const { createProduct } = require('../services/shopifyService');

router.post('/create', async (req, res) => {
  try {
    const { shopifyData, seoData } = req.body;
    const product = await createProduct(shopifyData, seoData);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

module.exports = router;