import { Router } from 'express';
import {
  createLevel,
  getAllLevels,
  getLevel,
  getLevelsCount,
} from '../controllers/levelController';

const router = Router();

// GET all levels
router.get('/', getAllLevels);

// POST create level
router.post('/', createLevel);

// GET single level
router.get('/:urlParameter', getLevel);

// GET get levels count
router.get('/count', getLevelsCount);

export default router;
