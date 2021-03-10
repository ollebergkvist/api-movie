const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const movieSchema = new schema(
	{
		title: { type: String, unique: true, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		stock: { type: Number, required: true, minimum: 0, default: 5 },
		rental_price: { type: Number, required: true, default: 10 },
		sales_price: { type: Number, required: true, default: 20 },
		availability: { type: Boolean, required: true, default: true },
		likes: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

movieSchema.plugin(mongoosePaginate);
movieSchema.plugin(mongoose_delete, { deletedAt: true });

const Movie = (module.exports = mongoose.model('Movie', movieSchema, 'movies'));
