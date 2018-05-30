const conn = require('../conn');
const { Sequelize } = conn;

const Game = conn.define('game', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, { underscored: true });

module.exports = Game;
