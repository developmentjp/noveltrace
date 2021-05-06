import express, { Router } from 'express';
import { landing } from '../controllers/indexController';

const router: Router = express.Router();

router.get('/', landing);

export default router;
