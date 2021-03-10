const supertest = require('supertest');
const createServer = require('../../models/server.js');
const Movies = require('../../schemas/movie.js');
const app = createServer();
process.env.TEST_SUITE = 'test';

/* Test cases */

describe('GET /movies', function () {
	it('GET /movies', async () => {
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
				// Check the response data
				expect(response.body.document[0]._id).toBe(movie.id);
				expect(response.body.document[0].title).toBe(movie.title);
				expect(response.body.document[0].description).toBe(movie.description);
			});
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
			// Check the response data
			expect(response.body._id).toBe(movie.id);
			expect(response.body.title).toBe(movie.title);
			expect(response.body.description).toBe(movie.description);
		});
});

test('POST /api/posts', async () => {
	const data = {
		title: 'Wild Strawberries222',
		description:
			'After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.',
		image:
			'https://m.media-amazon.com/images/M/MV5BZjJhNTBmNTgtMDViOC00NDY2LWE4N2ItMDJiM2ZiYmQzYzliXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_UY268_CR2,0,182,268_AL_.jpg',
	};

	await supertest(app)
		.post('/api/movies')
		.send(data)
		.expect(201)
		.then(async (response) => {
			// const movie = await Movies.findOne({ title: 'Wild Strawberries222' });
			// console.log(movie.title);
			expect(response.body.document.title).toBeTruthy();
			expect(response.body.document.description).toBeTruthy();
			expect(response.body.document.image).toBeTruthy();
		});
});

// test('PUT /api/movies/:id', async () => {
// 	const post = await Post.create({
// 		title: 'Post 1',
// 		content: 'Lorem ipsum',
// 	});

// 	const data = {
// 		title: 'New title',
// 		content: 'dolor sit amet',
// 	};

// 	await supertest(app)
// 		.put('/api/posts/' + post.id)
// 		.send(data)
// 		.expect(200)
// 		.then(async (response) => {
// 			// Check the response
// 			expect(response.body._id).toBe(post.id);
// 			expect(response.body.title).toBe(data.title);
// 			expect(response.body.content).toBe(data.content);

// 			// Check the data in the database
// 			const newPost = await Post.findOne({ _id: response.body._id });
// 			expect(newPost).toBeTruthy();
// 			expect(newPost.title).toBe(data.title);
// 			expect(newPost.content).toBe(data.content);
// 		});
// });

test('DELETE /api/movies/:id', async () => {
	const movie = await Movies.create({
		title: 'Wild Strawberries',
		description:
			'After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.',
		image:
			'https://m.media-amazon.com/images/M/MV5BZjJhNTBmNTgtMDViOC00NDY2LWE4N2ItMDJiM2ZiYmQzYzliXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_UY268_CR2,0,182,268_AL_.jpg',
	});

	await supertest(app)
		.delete(`/api/movies/${movie.id}`)
		.expect(204)
		.then(async () => {
			expect(await Movies.findOne({ _id: movie.id })).toBeFalsy();
		});
});
