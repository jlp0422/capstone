const router = require('express').Router();
const { Team } = require('../db').models

router.get('/', (req, res, next) => {
  Team.findAll()
  .then(Teams => res.send(Teams))
})

module.exports = router;
