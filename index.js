const path = require('path');

// Load different .env variables depending on production / development / docker
if (process.env.NODE_ENV === 'docker') {
	require('dotenv').config({ path: path.resolve(__dirname, './.env.docker') });
} else {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const createServer = require('./models/server.js');
const port = process.env.PORT;
const uri = process.env.MONGDODB_URI;

const connection = mongoose
	.connect(uri, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		keepAlive: 300000,
		connectTimeoutMS: 30000,
	})
	.then(() => {
		if (connection) {
			console.log('Database connected');
		} else {
			console.log('Database connection error');
		}
	})
	.then(() => {
		const app = createServer();
		app.listen(port, () => {
			console.log(`Server listening on ${port} `);
		});
	});
