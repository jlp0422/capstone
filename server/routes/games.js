const router = require('express').Router();
const { Game, Player, Question } = require('../db').models;

router.get('/', (req, res, next) => {
  Game.findAll().then(games => res.send(games));
});
router.get('/current', (req, res, next) => {
  Game.find({
    where: { current: true }
  }).then(game => res.send(game));
});
router.get('/:id/teams', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game =>
      game.getPlayers({
        where: { game_id: game.id }
      })
    )
    .then(teams => res.send(teams));
});
router.get('/:id/questions', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game =>
      game.getQuestions({
        where: { game_id: game.id },
        include: [{ model: Question }]
      })
    )
    .then(questions => res.send(questions));
});

router.post('/', (req, res, next) => {
  Game.create(req.params.body).then(game => res.send(game));
});

module.exports = router;
