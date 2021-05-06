import express, { Router } from 'express';
import {
	view,
	find,
	form,
	create,
	edit,
	update,
	viewall,
	deleteNovel,
} from '../controllers/novelController';

const router: Router = express.Router();

// CRUD
router.get('/', view);
router.post('/', find);
router.get('/addnovel', form);
router.post('/addnovel', create);
router.get('/editnovel/:id', edit);
router.post('/editnovel/:id', update);
router.get('/viewnovel/:id', viewall);
router.get('/:id', deleteNovel);

export default router;
