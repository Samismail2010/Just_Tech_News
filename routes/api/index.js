//this file will serve as a means to collect all of the api routes and packages

const router = require('express').Router();

const userRoutes = require ('./user-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;