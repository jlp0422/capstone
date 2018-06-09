const router = require('express').Router();
const { Team } = require('../db').models

router.get('/', (req, res, next) => {
  Team.findAll()
  .then(Teams => res.send(Teams))
})

router.put('/:id', (req, res, next) => {
  Team.findById(req.params.id)
  // .then(team => team.update(req.body))
  .then(() => res.send(req))
  .catch(err => res.send(`this is an error with ${req.body}!!!: ${err}`))
})

module.exports = router;
