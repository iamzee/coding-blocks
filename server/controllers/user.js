const User = require('../models/user');
const Blog = require('../models/blog');
const formidable = require('formidable');
const path = require('path');
const _ = require('lodash');

const read = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			include: {
				model: Blog,
				order: [['updatedAt', 'DESC']],
				include: {
					model: User,
					attributes: ['firstName', 'lastName', 'avatar'],
				},
			},
			attributes: {
				exclude: ['password'],
			},
		});

		if (!user) {
			throw new Error('User does not exist.');
		}

		res.status(200).send({
			success: true,
			data: user,
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const update = async (req, res) => {
	try {
		if (req.params.id != req.user.id) {
			throw new Error('Authentication failed.');
		}

		const user = await User.findByPk(req.params.id, { include: Blog });

		if (!user) {
			throw new Error('User does not exist.');
		}

		const form = formidable({
			keepExtensions: true,
			uploadDir: path.join(__dirname, '..', '..', 'dist', 'uploads'),
		});

		form.parse(req, async (err, fields, files) => {
			console.log(fields);
			console.log(files);

			if (err) {
				res.status(400).send({
					success: false,
					message: 'Error while creating user.',
				});
			}

			let payload = {};
			payload = { ...fields };

			if (files['avatar']) {
				const filename = _.split(files['avatar'].path, '\\').pop();

				payload = { ...payload, avatar: filename };
			}

			// const user = User.build(payload);

			await user.update(payload);
			res.status(201).send({
				success: true,
				message: 'User updated successfully.',
			});
		});

		// const result = await user.update(payload);

		// res.status(200).send({
		// 	success: true,
		// 	message: 'User updated.',
		// 	data: result,
		// });
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const getMe = async (req, res) => {
	res.send({ success: true, data: req.user });
};

const remove = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();

		res.send({
			success: true,
			message: 'User deleted successfully.',
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const create = async (req, res) => {
	const form = formidable({
		keepExtensions: true,
		uploadDir: path.join(__dirname, '..', '..', 'dist', 'uploads'),
	});

	form.parse(req, async (err, fields, files) => {
		if (err) {
			res.status(400).send({
				success: false,
				message: 'Error while creating user.',
			});
		}

		let payload = {};
		payload = { ...fields };

		if (files['avatar']) {
			const filename = _.split(files['avatar'].path, '\\').pop();

			payload = { ...payload, avatar: filename };
		}

		try {
			const user = User.build(payload);

			await user.save();
			res.status(201).send({
				success: true,
				message: 'User created successfully.',
			});
		} catch (e) {
			let message = '';

			if (e.errors && e.errors[0].type == 'unique violation') {
				message = `${e.errors[0].path} already taken.`;
			} else if (e.errors && e.errors[0].type === 'notNull Violation') {
				message = `${e.errors[0].path} is required.`;
			} else if (e.errors && e.errors[0].type === 'Validation error') {
				message = `Invalid ${e.errors[0].path}`;
			} else {
				message = e;
			}

			res.status(400).send({
				success: false,
				message,
			});
		}
	});
};

module.exports = {
	create,
	getMe,
	read,
	update,
	remove,
};
