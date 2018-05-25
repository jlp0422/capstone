const conn = require('./conn');
const { Sequelize } = conn;

const Trivia = conn.define('trivia', {
  question: {
    type: Sequelize.STRING
  },
  answers: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});

module.exports = Trivia;
