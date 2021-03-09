const Movie = require('../schemas/movie.js');
const Rent = require('../schemas/rent.js');
const Purchase = require('../schemas/purchase.js');
const aqp = require('api-query-params');

// Sort recent record
// sort({ _id: -1 }
// {date: 1}
// {date: -1}

// { name: 1 } // ascending
// { name: -1 } // descending
// MongoClient.connect(url, function(err, db) {
// 	if (err) throw err;
// 	var dbo = db.db("mydb");
// 	var mysort = { name: 1 };
// 	dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
// 	  if (err) throw err;
// 	  console.log(result);
// 	  db.close();
// 	});
//   });
// .find().limit(5)

//

// GET /users?sort_by=first_name&order=asc
// GET /users?sort_by=asc(email)
// GET /users?limit=10

// GET /users?page=3&results_per_page=20
// Model.paginate({}, options, function (err, result) {
// {availability: false}
//   });

// Controller for retrieving all movies
// Pagination, sorting and filtering enabled
const getMovies = async (req, res, next) => {
	const sort = aqp(req.query).sort || null;
	const limit = aqp(req.query).limit || null;
	const filter = aqp(req.query).filter;
	console.log(aqp(req.query).filter);
	// const { filter, limit, sort } = aqp(req.query);

	const options = {
		limit: req.query.limit,
		page: req.query.page,
	};

	// if (!/\?.+/.test(req.url)) {d
	// 	const sortByTitleAsc = {
	// 		title: 1,
	// 	};

	try {
		const movies = await Movie.paginate(filter);
		res.status(200).json(movies);
	} catch (err) {
		res.status(404).json(err);
	}

	// if (req.body.admin === 'admin' && req.query.sort) {
	// 	try {
	// 		const movies = await Movie.find(filter).sort(sort).limit(limit);
	// 		res.status(200).json(movies);
	// 	} catch (err) {
	// 		res.status(404).json(err);
	// 	}
	// } else if (req.body.admin === 'admin' && !req.query.sort) {
	// 	try {
	// 		const movies = await Movie.find(filter).sort({ title: 1 }).limit(limit);
	// 		res.status(200).json(movies);
	// 	} catch (err) {
	// 		res.status(404).json(err);
	// 	}
	// } else {
	// 	try {
	// 		const movies = await Movie.find({ availability: true })
	// 			.sort(sort)
	// 			.limit(limit);
	// 		res.status(200).json(movies);
	// 	} catch (err) {
	// 		res.status(404).json(err);
	// 	}
	// }
};

// Controller for retrieving a movie by ID
const getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		return res.status(200).json(movie);
	} catch (err) {
		return res.status(404).send({
			message: 'Movie with given ID could not be found',
		});
	}
};

// Controller for searching for movies
const searchMovies = async (req, res) => {
	if (!req.query.title) {
		res.status(404).send('Query string is missing');
	}

	try {
		const movie = await Movie.find({
			title: { $regex: req.query.title, $options: 'i' },
		});
		res.status(200).json(movie);
	} catch (err) {
		return res.status(404).send({
			message: err.message,
		});
	}
};

// Controller for creating a movie
const createMovie = async (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		description: req.body.description,
		image: req.file.path,
		stock: req.body.stock,
		rental_price: req.body.rental_price,
		sales_price: req.body.sales_price,
		availability: req.body.availability,
	});

	try {
		movie.save();
		return res.status(201).json({
			message: 'Movie successfully created',
			document: movie,
		});
	} catch (err) {
		return res.status(404).send({
			message: err.message,
		});
	}
};

// Controller for updating a movie
const updateMovie = async (req, res, next) => {
	const newMovie = { _id: req.params.id };
	Movie.updateOne(newMovie, {
		title: req.body.title,
	})
		.then((document) => {
			if (!document) {
				return res.st(404).end();
			}
			return res.status(200).json(document);
		})
		.catch((err) => next(err));
};

// Controller for hard deleting a movie
const deleteMovie = async (req, res, next) => {
	try {
		const movie = await Movie.deleteOne({ _id: req.params.id });
		return res.status(204).json({
			message: 'Movie deleted Successfully',
			document: movie,
		});
	} catch (err) {
		return res.status(404).send({
			message: err.message,
		});
	}
};

// Controller for soft deleting a movie (mark as deleted)
const removeMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		movie.delete();
		res
			.status(204)
			.json({ message: 'Movie successfully deleted', document: movie });
	} catch (err) {
		return res.status(404).send({
			message: err.message,
		});
	}
};

// Controller for changing availability of a movie
const availability = async (req, res) => {
	try {
		const movie = await Movie.findByIdAndUpdate(
			req.params.id,
			{ availability: true },
			{ new: true }
		);
		res.status(200).json(movie);
	} catch (err) {
		return res.status(404).send({
			message: err.message,
		});
	}
};

// Controller for renting a movie
const rentMovie = async (req, res) => {
	const movie = await Movie.findById(req.body.movie_id);
	const movieStock = movie.stock;
	const orderAmount = req.body.amount;

	// Checks that there are sufficient movies in stock to continue with the rental
	if (movieStock >= orderAmount) {
		const newStock = movieStock - orderAmount;
		const rent = new Rent({
			movieID: req.body.movie_id,
			customerID: req.body.customer_id,
			amount: req.body.amount,
			cost: req.body.cost,
		});

		// Update stock for movie and create rental order
		try {
			await rent.save();
			await movie.update({
				stock: newStock,
			});

			return res.status(200).json({
				message: 'Movie successfully rented',
				document: rent,
			});
		} catch (err) {
			return res.status(404).send({
				message: err.message,
			});
		}
	} else {
		return res
			.status(200)
			.json({ message: 'Insufficient stock to complete order' });
	}
};

// Controller for renting a movie
const purchaseMovie = async (req, res) => {
	const movie = await Movie.findById(req.body.movie_id);
	const movieStock = movie.stock;
	const orderAmount = req.body.amount;

	if (movieStock >= orderAmount) {
		const newStock = movieStock - orderAmount;
		const purchase = new Purchase({
			movieID: req.body.movie_id,
			customerID: req.body.customer_id,
			amount: req.body.amount,
			cost: req.body.cost,
		});

		try {
			await purchase.save();
			await movie.update({
				stock: newStock,
			});

			return res.status(201).json({
				message: 'Movie successfully purchased',
				document: purchase,
			});
		} catch (err) {
			return res.status(404).send({
				message: err.message,
			});
		}
	} else {
		return res
			.status(200)
			.json({ message: 'Insufficient stock to complete order' });
	}
};

// Controller for renting a movie
const returnMovie = async (req, res) => {
	try {
		var rent = await Rent.findById(req.body.id);
	} catch (err) {
		return res.status(404).send({
			message: 'Rental order with given ID could not be found',
		});
	} finally {
		const currentTime = Date.now();
		const returnDate = rent.returnDate;
		const returnTime = returnDate.getTime();
		const timeDifference = currentTime - returnTime;
		const dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));
		const penaltySum = 5;
		const penaltyCharge = dayDifference * penaltySum;

		// Checks if movie is not returned on time
		if (currentTime > returnTime) {
			rent.penalty = penaltyCharge;
			rent.returned = true;
			rent.returnedAt = Date.now();
			rent.save();
		} else {
			rent.returned = true;
			rent.returnedAt = Date.now();
			rent.save();
		}

		return res.status(200).json({
			message: 'Movie successfully returned',
			document: rent,
		});
	}
};

module.exports = {
	getMovies,
	getMovie,
	searchMovies,
	createMovie,
	updateMovie,
	deleteMovie,
	removeMovie,
	availability,
	purchaseMovie,
	rentMovie,
	returnMovie,
};
