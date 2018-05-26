const Game = require('./models/Game.js');
const Bar = require('./models/Bar.js');
const Player = require('./models/Player.js');
const Question = require('./models/Question.js');

Game.hasMany(Player);
Player.belongsTo(Game);
Question.belongsTo(Game);

module.exports = {
  models: {
    Game,
    Bar,
    Player,
    Question
  }
};
