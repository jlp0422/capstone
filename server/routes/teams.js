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

router.put('/update/:name', (req, res, next) => {
  Team.findOne({
    where: { name: req.params.name }
  })
  .then(team => {
    Object.assign({}, team, req.body)
    return team.save()
  })
  .then(() => res.sendStatus(200))
  .catch(err => console.error(err))
})

module.exports = router;
