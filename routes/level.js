const express = require('express');
const router = express.Router();

const levelController = require('../controllers/levelController');

// GET all levels
router.get('/', levelController.get_all_levels);

// POST create level
router.post('/', levelController.post_create_level);

// GET get levels count
router.get('/count', levelController.get_levels_count);

module.exports = router;
