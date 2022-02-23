//this file will serve as a means to collect all of the api routes and packages

const router = require('express').Router();

const userRoutes = require ('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;