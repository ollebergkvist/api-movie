const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
	{
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		date: { type: Date, default: Date.now() },
		penalty: { type: Number },
		admin: { type: Boolean, default: false },
		favorites: [
			{
				movieID: { type: Number },
			},
		],
	},
	{ timestamps: true }
);

const User = (module.exports = mongoose.model('User', userSchema, 'users'));
