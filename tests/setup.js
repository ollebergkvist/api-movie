const mongoose = require('mongoose');
const Users = require('../schemas/user.js'); // Mongoose schema

// Create db connection before each test
beforeEach(async (done) => {
	try {
		await mongoose.connect(
			`mongodb://localhost:27017/${process.env.TEST_SUITE}`,
			{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
		);
	} catch (err) {
		console.log(err);
	}

	try {
		await Users.create({
			email: 'admin@gmail.com',
			password: 'Password#1',
		});
		done();
	} catch (err) {
		console.log(err);
	}
});

// Drop db and close connection after each test
afterEach((done) => {
	try {
		mongoose.connection.db.dropDatabase(() => {
			mongoose.connection.close(() => done());
		});
	} catch (err) {
		console.log(err);
	}
});

afterAll((done) => {
	return done();
});
