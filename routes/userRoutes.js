const express = require('express');
const routes = express.Router();

const userControllers = require('../controllers/usercontroller');

const validate = require('../middelware/validate');
const { userAddSchema, loginSchema } = require('../middelware/Schemas/userSchema');

routes.post('/adduser', validate(userAddSchema), userControllers.AddUser);

//login Routes
routes.post('/login', validate(loginSchema), userControllers.login);

module.exports = routes;
