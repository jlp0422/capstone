const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/', require('./local'));

module.exports = router;