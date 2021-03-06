export default {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/auth/login');
		}
	},
	ensureGuest: function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/dashboard');
		} else {
			return next();
		}
	},
};
