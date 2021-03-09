const fs = require('fs');

const logger = fs.createWriteStream('../log/log.txt', {
	flags: 'a',
});

module.exports = logger;

// for (let i = 0; i < 10; i++) {
// 	logger.write(i.toString() + '\r\n'); //'\r\n at the end of each value
// }
