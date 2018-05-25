const conn = require('../conn');
const { Sequelize } = conn;

const Question = conn.define('question', {
  question: Sequelize.STRING,
  answers: Sequelize.ARRAY(Sequelize.STRING),
  correct_answer: Sequelize.STRING
}, { underscored: true });

module.exports = Question;
