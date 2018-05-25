const router = require('express').Router();

router.use('/', require('./api'));
router.use('/players', require('./players'));
router.use('/bars', require('./bars'));
router.use('/auth', require('../auth'));

module.exports = router;
