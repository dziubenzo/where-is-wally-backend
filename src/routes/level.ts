import { Router } from 'express';
import {
  createLevel,
  getAllLevels,
  getLevelsCount,
} from '../controllers/levelController';

const router = Router();

// GET all levels
router.get('/', getAllLevels);

// POST create level
router.post('/', createLevel);

// GET get levels count
router.get('/count', getLevelsCount);

export default router;
