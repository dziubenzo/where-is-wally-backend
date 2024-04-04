const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

// GET all players
router.get('/', playerController.get_all_players);

// POST create player
router.post('/', playerController.post_create_player);

// GET players count
router.get('/count', playerController.get_players_count);

// GET latest player
router.get('/latest', playerController.get_latest_player);

module.exports = router;
