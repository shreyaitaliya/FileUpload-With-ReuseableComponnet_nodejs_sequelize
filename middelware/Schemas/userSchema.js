const joi = require('joi');

const userAddSchema = joi.object({
    username: joi.string().max(800),
    password: joi.string().max(800),
    firstname: joi.string().max(50),
    lastname: joi.string().max(50),
    email: joi.string().email().max(800),
    phonenumber: joi.string().max(12),
    address: joi.string().max(50),
});

const loginSchema = joi.object({
    username: joi.string().required().max(800),
    password: joi.string().required().max(800),
});

module.exports = { userAddSchema, loginSchema };
