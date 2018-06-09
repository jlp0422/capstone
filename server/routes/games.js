const router = require('express').Router();
const { Game, Team, Question } = require('../db').models;

router.get('/', (req, res, next) => {
  Game.findAll().then(games => res.send(games));
});

router.get('/active', (req, res, next) => {
  Game.findOne({ where: { active: true } }).then(game => res.send(game));
});

router.get('/:id/teams', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => Team.findAll({ where: { game_id: game.id } }))
    .then(teams => res.send(teams));
});

router.get('/:id/questions', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => Question.findAll({ where: { game_id: game.id } }))
    .then(questions => res.send(questions));
});
router.put('/:id/question', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => Question.findAll({ where: { game_id: game.id } }))
    .then(questions =>
      questions
        .find(question => (question === req.body.answer.id ? question : null))
        .then(question => {
          Object.assign(question, {
            answered_correctly: question.answered_correctly + 1
          });
          question.save();
        })
    );
});
router.post('/', (req, res, next) => {
  Game.create().then(game => res.send(game));
});

module.exports = router;
