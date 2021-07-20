const express = require('express');
const {
	create,
	fetch,
	fetchAll,
	update,
	remove,
	read,
} = require('../controllers/blog');
const passport = require('passport');

const router = express.Router();

router
	.route('/blogs')
	.all(passport.authenticate('jwt', { session: false }))
	.post(create)
	.get(fetch);

router.route('/blogs/all').get(fetchAll);
router.route('/blogs/:id').get(read);

router
	.route('/blogs/:id')
	.all(passport.authenticate('jwt', { session: false }))
	.patch(update)
	.delete(remove);

module.exports = router;
