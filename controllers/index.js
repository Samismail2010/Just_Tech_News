// collecting packeaged group of API endpoints

const router = require('express').Router();

const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

// if we make a request to any end point that doesnt exist we get this 404 error
router.use((req, res) => {
    res.status(404).end();
});



module.exports = router;