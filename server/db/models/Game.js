const conn = require('../conn');
const { Sequelize } = conn;

const Game = conn.define('game', {
    current: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    num_of_teams: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, { underscored: true }
);

module.exports = Game;
