const mongoose = require('mongoose');

beforeEach(async (done) => {
	try {
		await mongoose.connect(
			`mongodb://localhost:27017/${process.env.TEST_SUITE}`,
			{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
			() => done()
		);
	} catch (err) {
		console.log(err);
	}
});

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
