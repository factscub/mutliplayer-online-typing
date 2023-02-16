const userData = require('express').Router();
const { homeRoute, registerRoute, loginRoute } = require('../Controllers/userData');

userData
    .get('/', homeRoute)
    .post('/register', registerRoute)
    .post('/login', loginRoute)

module.exports = { userData };