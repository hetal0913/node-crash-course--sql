const router = require('express').Router();

//All routes
router.use('/users', require('./userRoutes'));
router.use('/login', require('./loginRoutes'));
router.use('/blogs', require('./blogRoutes'));

module.exports = router;