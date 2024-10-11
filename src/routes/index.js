const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.get('/', (req, res) => {
  res.render('index', { title: 'Shopify AI Product Creator', googleClientId: process.env.GOOGLE_CLIENT_ID });
});

module.exports = router;


