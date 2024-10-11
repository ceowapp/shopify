const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/import', documentController.importDocument);

module.exports = router;

