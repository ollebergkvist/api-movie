const supertest = require('supertest');
const createServer = require('../../models/server.js');
const Movies = require('../../schemas/movie.js');
const app = createServer();
process.env.TEST_SUITE = 'test';

/* Test cases */
test('GET /movies', async () => {
	const movie = await Movies.create({
		title: 'Wild Strawberries',
		description:
			'After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.',
		image:
			'https://m.media-amazon.com/images/M/MV5BZjJhNTBmNTgtMDViOC00NDY2LWE4N2ItMDJiM2ZiYmQzYzliXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_UY268_CR2,0,182,268_AL_.jpg',
	});

	await supertest(app)
		.get('/api/movies')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.then((response) => {
			expect(response.body.document.docs[0]._id).toBe(movie.id);
			expect(response.body.document.docs[0].title).toBe(movie.title);
			expect(response.body.document.docs[0].description).toBe(
				movie.description
			);
		});
});

test('GET /movies/:id', async () => {
	const movie = await Movies.create({
		title: 'Wild Strawberries',
		description:
			'After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.',
		image:
			'https://m.media-amazon.com/images/M/MV5BZjJhNTBmNTgtMDViOC00NDY2LWE4N2ItMDJiM2ZiYmQzYzliXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_UY268_CR2,0,182,268_AL_.jpg',
	});

	await supertest(app)
		.get(`/api/movies/${movie.id}`)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.then((response) => {
			expect(response.body.document._id).toBe(movie.id);
			expect(response.body.document.title).toBe(movie.title);
			expect(response.body.document.description).toBe(movie.description);
		});
});

test('POST /register', async () => {
	await supertest(app)
		.post('/api/register')
		.send({ email: 'johndoe@gmail.com', password: 'Password#1' })
		.expect(201);
});

test('POST /login', async () => {
	try {
		await supertest(app)
			.post('/api/login')
			.send({ email: 'admin@gmail.com', password: 'Password#1' })
			.expect(401);
	} catch (err) {
		console.log(err);
	}
});
