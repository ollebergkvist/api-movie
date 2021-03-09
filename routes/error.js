const express = require('express');
const path = require('path');
const router = express.Router();

router.use(function (req, res) {
	return res.status(404).json({
		errors: {
			status: 404,
			source: req.path,
			title: 'Not found',
			detail: 'Could not find path: ' + req.path,
		},
	});
});
