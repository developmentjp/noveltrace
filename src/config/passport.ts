import GoogleStrategy from 'passport-google-oauth20';

export default function (passport: any) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback', //redirect
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleId: profile.id,
					displayName: profile.displayName,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					image: profile.photos[0].value,
				};
				console.log(newUser);

				try {
					// let user = await User.findOne({ googleId: profile.id });

					// if (user) {
					done(null, newUser);
					// } else {
					// 	user = await User.create(newUser);
					// 	done(null, user);
					// }
				} catch (err) {
					console.error(err);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.googleId);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
		// User.findById(id, (err, user) => done(err, user));
	});
}
