const conn = require('../conn');
const { Sequelize } = conn;
const Team = require('./Team');
const axios = require('axios');
const Question = require('./Question');

const Game = conn.define(
  'game',
  {
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    num_of_teams: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  { underscored: true }
);

Game.prototype.getAllTeams = function() {
  return Team.findAll({ where: { game_id: this.id }})
}

Game.startGame = function() {
  return Game.create()
  .then((game) => {
    return axios.get('https://untapped-trivia.herokuapp.com/v1/questions')
    .then(res => res.data.results)
    .then(questions => {
      questions.map(question => {
        Question.create({
          question: question.question,
          answers: question.answers,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          difficulty: question.difficulty,
          category: question.category,
        })
        .then(question => question.setGame(game))
      })
    })
  })
  .then(game => {
    return game
  })
}

module.exports = Game;
