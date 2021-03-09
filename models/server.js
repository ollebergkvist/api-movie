const express = require('express');
const routes = require('../routes/movie.js');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

function createServer() {
	const app = express(); // Binds express to app
	app.use(helmet()); // Helmet for secure headers
	app.use(compression()); // Enables gzip compression
	app.use(morgan('combined'));
	app.use(express.json()); // Parse JSON bodies
	app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
	app.use(cors()); // Cross-origin resource sharing
	app.use('/uploads', express.static('./uploads')); // Make uploads folder static file so it can be accessed
	app.use('/api', routes); // Enables routes
	// Enables static index site
	app.route('/').get(function (req, res) {
		res.sendFile(process.cwd() + '/index.html');
	});
	// Capture All 404 errors
	app.use(function (req, res, next) {
		res.status(404).json({
			errors: {
				status: 404,
				source: req.path,
				title: 'Not found',
				detail: 'Could not find path: ' + req.path,
			},
		});
	});

	return app;
}

module.exports = createServer;
