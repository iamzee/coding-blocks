const express = require('express');
const { create, getMe, read, update, remove } = require('../controllers/user');
const passport = require('passport');

const router = express.Router();

router.route('/users').post(create);

router
	.route('/users/me')
	.all(passport.authenticate('jwt', { session: false }))
	.get(getMe);

router.route('/users/:id').get(read);

router
	.route('/users/:id')
	.all(passport.authenticate('jwt', { session: false }))
	.patch(update)
	.delete(remove);

module.exports = router;
