const conn = require('../conn');
const { Sequelize } = conn;

const Game = conn.define('game', {});

module.exports = Game;
