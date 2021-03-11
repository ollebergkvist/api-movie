const winston = require('winston');

const logger = winston.createLogger({
	format: winston.format.json(),
	showLevel: false,
	transports: [new winston.transports.File({ filename: '../log/movies.log' })],
});

module.exports = logger;
