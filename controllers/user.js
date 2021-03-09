const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/user.js');

const updateUserRights = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ admin: req.body.admin },
			{ new: true }
		);

		if (!user) {
			res.send(409).json({
				type: 'Error',
				source: req.path,
				detail: 'User with given id could not be found',
			});
		}

		res.status(200).json({
			type: 'Success',
			source: req.path,
			detail: 'User rights updated successfully',
		});
	} catch (err) {
		return res.status(404).send({
			type: 'Error',
			source: req.path,
			title: 'Database error',
			message: err.message,
		});
	}
};

const getUsers = (req, res) => {
	Movie.find().then((users) => {
		return res.status(200).json({
			type: 'Success',
			message: 'Users retrieved successfully',
			documents: users,
		});
	});
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			res.send(409).json({
				type: 'Error',
				source: req.path,
				detail: 'User with given id could not be found',
			});
		}

		res.status(200).json({
			type: 'Success',
			source: req.path,
			detail: 'User found',
			document: user,
		});
	} catch (err) {
		return res.status(404).send({
			type: 'Error',
			source: req.path,
			title: 'Database error',
			detail: err.message,
		});
	}
};

const register = async (req, res) => {
	const saltRounds = 10;

	// Try to hash password
	try {
		var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
	} catch (err) {
		return res.status(500).json({
			errors: {
				type: 'Error',
				source: req.path,
				title: 'Bcrypt error',
				detail: 'Bcrypt was unable to hash password',
			},
		});
	}

	// Try to create user
	try {
		const newUser = new userSchema({
			email: req.body.email,
			password: hashedPassword,
		});

		// Checks if email address is registered already
		const user = await userSchema.findOne({ email: req.body.email });
		if (user) {
			res.status(409).send({
				type: 'Error',
				source: req.path,
				title: 'Registration error',
				detail: 'An account with this email already exists',
			});
		} else {
			// Saves new user
			await newUser.save();
			res.status(201).send({
				type: 'Success',
				source: req.path,
				detail: 'Registration succeeded',
			});
		}
	} catch (err) {
		res.status(500).send({
			type: 'Error',
			source: req.path,
			title: 'Database error',
			message: err.message,
		});
	}
};

const login = async (req, res) => {
	const secret = process.env.SECRET;
	try {
		// Try to find a user with given email
		const user = await userSchema.findOne({ email: req.body.email });

		// Error handling if a user with given email was not found
		if (!user) {
			res.status(409).send({
				type: 'Error',
				source: req.path,
				title: 'Authorization error',
				detail: 'Account with given email was not found.',
			});
		} else {
			// Compares password from http request with password in db
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					return res.status(500).json({
						type: 'Error',
						source: req.path,
						title: 'Bcrypt error',
						detail: 'Bcrypt was unable to compare passwords',
					});
				}

				if (!result) {
					return res.status(401).json({
						type: 'Error',
						source: req.path,
						title: 'Authorization error',
						detail: 'Wrong password',
					});
				}

				// Creates jwt token
				const payload = { email: user.email, admin: user.admin };
				const token = jwt.sign(payload, secret, {
					expiresIn: '24h',
				});

				return res.status(200).json({
					type: 'Success',
					source: req.path,
					detail: 'User logged in',
					user: user.email,
					admin: user.admin,
					token: token,
				});
			});
		}
	} catch (err) {
		res.status(500).json({
			type: 'Error',
			source: req.path,
			title: 'Database error',
			detail: err.message,
		});
	}
};

const addFavoriteMovie = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			res.send(409).json({
				type: 'Error',
				source: req.path,
				detail: 'User with given id could not be found',
			});
		}

		user.favorites.push({ movieID: 5 });
		user.save();
		return res.status(200).json({
			type: 'Success',
			source: req.path,
			detail: 'Movie added to user favorites',
		});
	} catch (err) {
		console.log({
			type: 'Error',
			source: req.path,
			title: 'Database error',
			detail: err.message,
		});
	}
};

module.exports = {
	updateUserRights,
	getUsers,
	getUser,
	register,
	login,
	addFavoriteMovie,
};
