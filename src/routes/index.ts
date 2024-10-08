import { Router } from 'express';
import { index } from '../controllers/indexController';

const router = Router();

// ALL root path
router.all('/', index);

export default router;
