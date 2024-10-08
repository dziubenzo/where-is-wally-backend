import { Router } from 'express';
import {
  createPlayer,
  getAllPlayers,
  getLatestPlayer,
  getPlayersCount,
} from '../controllers/playerController';

const router = Router();

// GET all players
router.get('/', getAllPlayers);

// POST create player
router.post('/', createPlayer);

// GET players count
router.get('/count', getPlayersCount);

// GET latest player
router.get('/latest', getLatestPlayer);

export default router;
