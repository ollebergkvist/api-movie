const express = require('express'); // Express module
const router = express.Router(); // Bind express method to router
const schemas = require('../middleware/schemas.js'); // Joi schemas
const validator = require('express-joi-validation').createValidator({}); // Middleware to validate req.body, req.params and req.query
const userController = require('../controllers/user.js'); // Route handler for users
const auth = require('../middleware/auth.js'); // Middleware to authenticate with JWT
const admin = require('../middleware/admin.js'); // Middleware to verify admin rights

// Update user permissions
router.put(
	'/user/:id',
	auth,
	admin,
	validator.params(schemas.id),
	validator.body(schemas.id),
	userController.updateUserRights
);

// Get all users
router.get('/users', auth, admin, userController.getUsers);

// Get user by id
router.get(
	'/user/:id',
	auth,
	admin,
	validator.params(schemas.id),
	userController.getUser
);

// Register user
router.post(
	'/register',
	validator.body(schemas.register),
	userController.register
);

// Login
router.post('/login', validator.body(schemas.login), userController.login);

// Like movie
router.put(
	'/favorite/:id',
	auth,
	validator.params(schemas.id),
	validator.body(schemas.favorite),
	userController.addFavoriteMovie
);

module.exports = router;
