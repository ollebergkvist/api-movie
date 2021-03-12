const winston = require('winston');

module.exports = async function () {
	return winston.createLogger({
		format: winston.format.json(),
		showLevel: false,
		transports: [
			new winston.transports.File({ filename: '../log/movies.log' }),
		],
	});
};
