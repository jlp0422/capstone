const router = require('express').Router();

router.use('/', require('./api'));
router.use('/teams', require('./teams'));
router.use('/bars', require('./bars'));
router.use('/games', require('./games'));
router.use('/auth', require('../auth'));
router.use('/checkout', require('./checkout'));

module.exports = router;
