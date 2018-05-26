const router = require('express').Router();
const { Player } = require('../db').models

router.get('/', (req,res, next) => {
  Player.findAll()
  .then(players => res.send(players))
})

module.exports = router;