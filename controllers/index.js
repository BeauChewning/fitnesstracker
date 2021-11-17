const router = require('express').Router();
const viewRoute = require('./view');
const workoutRoutes = require('./api');

router.use('/', viewRoute);
router.use('/api', workoutRoutes)

module.exports = router;