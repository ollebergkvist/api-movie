const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Password requirements
const complexityOptions = {
	min: 8,
	max: 20,
	lowerCase: 1,
	upperCase: 1,
	numeric: 1,
	symbol: 1,
	requirementCount: 4,
};

const schemas = {
	id: Joi.object({
		id: Joi.string().min(1).required(),
	}),
	create: Joi.object({
		admin: Joi.boolean().required(),
		title: Joi.string().min(1).required(),
		description: Joi.string().min(1).required(),
		stock: Joi.number().min(1).required(),
		rental_price: Joi.number().min(1).required(),
		sales_price: Joi.number().min(1).required(),
		availability: Joi.boolean().required(),
	}),
	search: Joi.object({
		title: Joi.string().min(1).required(),
	}),
	rent: Joi.object({
		movie_id: Joi.string().min(1).required(),
		customer_id: Joi.string().min(1).required(),
		amount: Joi.number().min(1).required(),
		cost: Joi.number().min(1).required(),
	}),
	purchase: Joi.object({
		movie_id: Joi.string().min(1).required(),
		customer_id: Joi.string().min(1).required(),
		amount: Joi.number().min(1).required(),
		cost: Joi.number().min(1).required(),
	}),
	register: Joi.object({
		email: Joi.string().email(),
		password: passwordComplexity(complexityOptions),
		// password: .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	}),
};
module.exports = schemas;
