const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/user-model.js');

router.post('/signup', async (req, res, next) => {
	const data = req.body;

	const hash = bcrypt.hashSync(data.password, 12);
	data.password = hash;

	try {
		const savedData = await Users.add(data);
		res.status(201).json(savedData);
	} catch (err) {
		next(err);
	}
})

router.post('/login', async (req, res, next) => {
	let {
		username,
		password
	} = req.body;

	try {
		const user = await Users.findBy({
			username
		}).first();
		if (user && bcrypt.compareSync(password, user.password)) {
			req.session.user = user;
			res.status(200).json({
				message: `Welcome ${user.username}!`,
			});
		} else {
			res.status(401).json({
				message: 'invalid credentials'
			});
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router;