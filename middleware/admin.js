module.exports = function (req, res, next) {
	if (req.body.admin === false) {
		console.log('false');
		res.status(401).send('Unauthorized');
	} else {
		next();
	}
};
