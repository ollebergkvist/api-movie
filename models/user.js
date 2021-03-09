const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// User object
var user = {
	register: function (body, res) {
		// Params from body request
		const email = body.email;
		const password = body.password;
		// Errors array
		var errors = [];

		// Verifies parameters in http request (body)
		if (!email) {
			errors.push('No password specified');
		}
		if (!password) {
			errors.push('No email specified');
		}
		if (!validator.validate(email)) {
			errors.push('Entered email is not valid');
		}
		if (errors.length) {
			res.status(401).json({ error: errors.join(',') });
			return;
		}

		// Hashes password with bcrypt
		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				return res.status(500).json({
					errors: {
						status: 500,
						source: '/register',
						title: 'Bcrypt error',
						detail: 'Bcrypt error',
					},
				});
			}

			// SQL
			const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

			// Executes SQL
			db.run(sql, [email, hash], (err) => {
				if (err) {
					return res.status(500).json({
						errors: {
							status: 500,
							source: '/register',
							title: 'Database error',
							detail: err.message,
						},
					});
				}
				return res.status(201).json({
					data: {
						message: 'User successfully registered.',
					},
				});
			});
		});
	},

	login: function (body, res) {
		// Body parameterss from http request
		const email = body.email;
		const password = body.password;

		// Errors array
		var errors = [];

		// Verifies parameters in http request (body)
		if (!email) {
			errors.push('No email specified');
		}
		if (!password) {
			errors.push('No password specified');
		}
		if (errors.length) {
			res.status(401).json({ error: errors.join(',') });
			return;
		}

		// SQL
		const sql = 'SELECT * FROM users WHERE email = ?';

		// Executes SQL
		db.get(sql, [email], (err, rows) => {
			if (err) {
				return res.status(500).json({
					errors: {
						status: 500,
						source: '/login',
						title: 'Database error',
						detail: err.message,
					},
				});
			}

			if (rows === undefined) {
				return res.status(401).json({
					errors: {
						status: 401,
						source: '/login',
						title: 'Authorization error',
						detail: 'Email with provided email not found.',
					},
				});
			}

			// Compares password from http request with password in db
			// By comparing the hash
			bcrypt.compare(password, rows.password, (err, result) => {
				if (err) {
					return res.status(500).json({
						errors: {
							status: 500,
							source: '/login',
							title: 'Bcrypt error',
							detail: 'Bcrypt error',
						},
					});
				}

				if (!result) {
					return res.status(401).json({
						data: {
							status: 401,
							type: 'Error',
							message: 'Password unmatched in db, user not logged in',
						},
					});
				}

				// Creates jwt token
				const payload = { email: rows.email }; // Måste vara ett objekt för att expiresIn ska fungera
				const token = jwt.sign(payload, jwtSecret, {
					expiresIn: '24h',
				});

				return res.json({
					data: {
						status: 200,
						type: 'Success',
						message: 'Password matched in db, user successfully logged in.',
						user: payload,
						token: token,
					},
				});
			});
		});
	},

	checkToken: function (req, res, next) {
		var token = req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, jwtSecret, function (err, decoded) {
				if (err) {
					return res.status(500).json({
						errors: {
							status: 500,
							source: req.path,
							title: 'Failed authentication',
							detail: err.message,
						},
					});
				}

				next();

				return undefined;
			});
		} else {
			return res.status(401).json({
				errors: {
					status: 401,
					source: req.path,
					title: 'No token',
					detail: 'No token provided in request headers',
				},
			});
		}
	},
};

module.exports = user;
