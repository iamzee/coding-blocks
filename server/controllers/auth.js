const _ = require('lodash');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	try {
		const data = _.pick(req.body, ['email', 'password']);

		// finding user by credential
		const user = await User.findOne({
			where: {
				email: data.email,
			},
		});

		if (!user) {
			throw new Error('Authentication failed');
		}

		// checking if password is correct or not
		const passwordMatch = await bcrypt.compare(
			data.password,
			user.password
		);

		if (!passwordMatch) {
			throw new Error('Authentication failed');
		}

		// generating token
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

		let userObj = user.toJSON();

		delete userObj['password'];

		res.send({
			success: true,
			data: {
				user: userObj,
				token,
			},
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

module.exports = {
	login,
};
