const router = require('express').Router();

const User = require('./user-model');

router.get('/', async (req, res, next) => {
	try {
		const data = await User.find();
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
})

module.exports = router;