const mongoose = require('mongoose');

beforeEach((done) => {
	mongoose.connect(
		`mongodb://localhost:27017/movies`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
		() => done()
	);
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

afterAll((done) => {
	return done();
});
