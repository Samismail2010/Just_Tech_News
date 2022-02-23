// collecting packeaged group of API endpoints

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if we make a request to any end point that doesnt exist we get this 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;