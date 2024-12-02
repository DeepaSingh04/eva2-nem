const express = require('express');

const { searchContacts } = require('../controllers/searchController');

const { authenticateAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/search', authenticateAdmin, searchContacts);

module.exports = router;