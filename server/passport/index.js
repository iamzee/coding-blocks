const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
	try {
		const user = await User.findByPk(payload.id);

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

module.exports = passport => {
	passport.use(strategy);
};
