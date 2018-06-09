const conn = require('../conn');
const { Sequelize } = conn;
const Team = require('./Team');

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

Game.prototype.getAllTeams = function(){
  return Team.findAll({ where: { game_id: this.id }})
}

module.exports = Game;
