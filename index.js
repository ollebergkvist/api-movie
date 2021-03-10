require('dotenv').config();
const mongoose = require('mongoose');
const createServer = require('./models/server.js');
var port = 3000;
var uri =
	'mongodb+srv://ollebergkvist:76yCT7fyEA8TNcJB@cluster0.bhxhf.mongodb.net/movies?retryWrites=true&w=majority';

// if (process.env.NODE_ENV === 'test') {
// 	uri = 'mongodb://localhost:27017/movies';
// 	port = 3000;
// } else {
// 	uri = process.env.MONGDODB_URI;
// 	port = process.env.PORT;
// }

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
