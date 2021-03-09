const express = require('express'); // Express module
const router = express.Router(); // Bind express method to router
const userController = require('../controllers/user.js'); // Route handler for users
const auth = require('../middleware/auth.js'); // Middleware to authenticate with JWT
const admin = require('../middleware/admin.js'); // Middleware to verify admin rights

// Update user permissions
router.put('/user/:id', auth, admin, userController.updateUserRights);

// Get all users
router.get('/users', auth, admin, userController.getUsers);

// Get user by id
router.post('/user/:id', auth, admin, userController.getUser);

// Register user
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Like movie
router.put('/favorite/:id', auth, userController.addFavoriteMovie);

module.exports = router;
