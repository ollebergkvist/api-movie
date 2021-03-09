const express = require('express'); // Express module
const router = express.Router(); // Bind express method to router
const movieController = require('../controllers/movie.js'); // Route handler for movies
const schemas = require('../middleware/schemas.js'); // Joi schemas
const validator = require('express-joi-validation').createValidator({}); // Middleware to validate req.body, req.params and req.query
const auth = require('../middleware/auth.js'); // Middleware to authenticate with JWT
const admin = require('../middleware/admin.js'); // Middleware to verify admin rights
const uploadImage = require('../middleware/upload-image.js'); //Middleware to upload images to server

// Get all movies
router.get('/movies', movieController.getMovies);

// Get single movie by id
router.get(
	'/movies/:id',
	validator.params(schemas.id),
	movieController.getMovie
);

// Search
router.post(
	'/movies/search',
	validator.query(schemas.search),
	movieController.searchMovies
);

// Create movie
router.post(
	'/movies',
	auth,
	admin,
	uploadImage,
	validator.body(schemas.create),
	movieController.createMovie
);

// Update movie
router.put(
	'/movies/:id',
	auth,
	admin,
	validator.params(schemas.id),
	validator.body(schemas.put),
	movieController.updateMovie
);

// Delete movie (Hard delete)
router.delete(
	'/movies/:id',
	auth,
	admin,
	validator.params(schemas.id),
	movieController.deleteMovie
);

// Remove movie (Soft delete)
router.post(
	'/return/:id',
	auth,
	admin,
	validator.params(schemas.id),
	movieController.removeMovie
);

// Change availability of movie by id
router.put(
	'/movies/availability/:id',
	auth,
	admin,
	validator.params(schemas.id),
	movieController.availability
);

// Rent movie
router.post(
	'/movies/rent',
	auth,
	validator.body(schemas.rent),
	movieController.rentMovie
);

// Purchase movie
router.post(
	'/movies/purchase',
	auth,
	validator.body(schemas.purchase),
	movieController.purchaseMovie
);

// Return movie
router.post(
	'/movies/return/:id',
	auth,
	admin,
	validator.params(schemas.id),
	movieController.returnMovie
);

module.exports = router;
