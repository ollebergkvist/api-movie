var mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://ollebergkvist:76yCT7fyEA8TNcJB@cluster0.bhxhf.mongodb.net/movies?retryWrites=true&w=majority'
);
const newUser = require('../schemas/user.js');

// User documents
const user1 = new newUser({
	email: 'admin@admin.com',
	password: 'Password#1',
	admin: true,
});

const user2 = new newUser({
	email: 'user@user.com',
	password: 'Password#1',
});

// Users array
const users = [user1, user2];

// Insert users
async function insertUsers() {
	try {
		const res = await newUser.insertMany(users);
		console.log('Users successfully inserted in the users collection');
		console.log(res);
	} catch (err) {
		console.error(err);
	}
}

// Call insertUsers
insertUsers();
