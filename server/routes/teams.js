const router = require('express').Router();
const { Team } = require('../db').models

router.get('/', (req, res, next) => {
  Team.findAll()
  .then(Teams => res.send(Teams))
})

router.put('/:id', (req, res, next) => {
  Team.findById(req.params.id)
  .then(team => team.update(req.body))
  .then(() => res.sendStatus(200))
  .catch(err => res.send(`this is an error!!!: ${err}`))
})

module.exports = router;
