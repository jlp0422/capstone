const router = require('express').Router();

router.use('/', require('./api'));
router.use('/teams', require('./teams'));
router.use('/auth', require('../auth'));

module.exports = router;