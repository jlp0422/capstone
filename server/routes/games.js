const router = require('express').Router();
const { Game, Team, Question } = require('../db').models;

router.get('/', (req, res, next) => {
  Game.findAll().then(games => res.send(games));
});

router.get('/active', (req, res, next) => {
  Game.findOne({ where: { active: true }})
  .then(game => res.send(game));
});

router.get('/:id/teams', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => Team.findAll({ where: { game_id: game.id }}))
    .then(teams => res.send(teams));
});

router.get('/:id/questions', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => Question.findAll({ where: { game_id: game.id }}))
    .then(questions => res.send(questions));
});

router.post('/', (req, res, next) => {
  Game.create().then(game => res.send(game));
});

module.exports = router;
