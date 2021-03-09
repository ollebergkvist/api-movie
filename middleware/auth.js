const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = function (req, res, next) {
	const token = req.headers['x-access-token'];

	if (!token)
		return res.status(401).json({
			status: 401,
			source: req.path,
			message: 'No token provided in request headers',
		});

	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).send({
			status: 401,
			source: req.path,
			message: 'Failed authentication',
			detail: err.message,
		});
	}
};
