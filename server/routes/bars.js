const router = require('express').Router();
const { Bar, Team, Game } = require('../db').models;

router.get('/', (req, res, next) => {
  Bar.findAll({
    include: [{ model: Team }, { model: Game }]
  }).then(bars => res.send(bars));
});

router.post('/:id', (req, res, next) => {
  Bar.findById(req.params.id).then(bar => res.send(bar));
});

router.post('/', (req, res, next) => {
  Bar.create(req.params.body).then(bar => res.send(bar));
});

module.exports = router;
