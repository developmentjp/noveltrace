import express, { Router } from 'express';
import { landing } from '../controllers/indexController';
import authMiddleware from '../../middlewares/authMiddleware';

const router: Router = express.Router();

router.get('/', authMiddleware.ensureGuest, landing);

export default router;
