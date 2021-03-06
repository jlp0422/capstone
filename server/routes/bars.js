const router = require('express').Router();
const { Bar, Team, Game } = require('../db').models;

router.get('/', (req, res, next) => {
  Bar.findAll({
    include: [{ model: Team }, { model: Game }]
  }).then(bars => res.send(bars));
});

router.get('/:id', (req, res, next) => {
  Bar.findById(req.params.id).then(bar => res.send(bar));
});
// Bar.findOne({
//   where: { id: req.params.id },
//   include: [{ model: Team }, { model: Game }]
// }).then(bar => res.send(bar));
router.get('/:id/games', (req, res, next) => {
  Game.findAll({ where: { bar_id: req.params.id } }).then(games =>
    res.send(games)
  );
});
router.get('/:id/teams', (req, res, next) => {
  Team.findAll({ where: { bar_id: req.params.id } }).then(teams =>
    res.send(teams)
  );
});

router.post('/:id', (req, res, next) => {
  Bar.findById(req.params.id).then(bar => res.send(bar));
});

//DO WE NEED A SECOND POST?
router.post('/', (req, res, next) => {
  Bar.create(req.params.body).then(bar => res.send(bar));
});

//ADDED PUT ROUTE
router.put('/:id', (req, res, next) => {
  Bar.findById(req.params.id)
    .then(bar => {
      Object.assign(bar, req.body);
      return bar.save();
    })
    .then(bar => res.send(bar))
    .catch(err => console.log(err));
});

module.exports = router;
