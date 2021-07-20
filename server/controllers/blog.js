const Blog = require('../models/blog');
const User = require('../models/user');
const _ = require('lodash');

const create = async (req, res) => {
	const data = _.pick(req.body, ['title', 'description']);
	const user = req.user;

	try {
		const blog = await Blog.create({ ...data, userId: user.id });

		res.status(201).send({
			success: true,
			data: blog,
			message: 'Blog created.',
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e,
		});
	}

	res.send('CREATING BLOG...');
};

const read = async (req, res) => {
	try {
		const blog = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName', 'avatar'],
				},
			],
		});

		if (!blog) {
			throw new Error('Blog does not exist.');
		}

		res.status(200).send({
			success: true,
			data: blog,
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const fetch = async (req, res) => {
	try {
		const blogs = await Blog.findAll({
			where: {
				userId: req.user.id,
			},
		});

		res.status(200).send({
			success: true,
			data: blogs,
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
		const payload = _.pick(req.body, ['title', 'description']);

		const blog = await Blog.findOne({
			where: {
				id: req.params.id,
				userId: req.user.id,
			},
		});

		const result = await blog.update(payload);
		res.status(200).send({
			success: true,
			data: result,
			message: 'Blog updated.',
		});
	} catch (e) {
		console.log('Error', e);
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const remove = async (req, res) => {
	try {
		const blog = await Blog.findOne({
			where: {
				id: req.params.id,
				userId: req.user.id,
			},
		});

		await blog.destroy();
		res.status(200).send({
			success: true,
			message: 'Blog deleted.',
		});
	} catch (e) {
		console.log('Error', e);
		res.status(400).send({
			success: false,
			message: e.message,
		});
	}
};

const fetchAll = async (req, res) => {
	try {
		const blogs = await Blog.findAll({
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName', 'avatar'],
				},
			],
			order: [['updatedAt', 'DESC']],
		});

		res.status(200).send({
			success: true,
			data: blogs,
		});
	} catch (e) {
		res.status(400).send({
			success: false,
			message: e,
		});
	}
};

module.exports = {
	create,
	read,
	fetch,
	fetchAll,
	update,
	remove,
};
