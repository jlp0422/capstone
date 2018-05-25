const conn = require('../conn');
const { Sequelize } = conn;

const Game = conn.define('game', {}, { underscored: true });

module.exports = Game;
