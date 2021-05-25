import express, { Request, Response, Router } from 'express';
import passport from 'passport';

const router: Router = express.Router();

router.get('/login', (req, res) =>
	res.render('login', { layout: 'login.hbs' })
);
// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/dashboard');
	}
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req: any, res) => {
	req.logout();
	res.redirect('/');
});

export default router;
