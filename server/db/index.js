const Game = require('./models/Game.js');
const Bar = require('./models/Bar.js');
const Player = require('./models/Player.js');
const Trivia = require('./models/Trivia.js');

Game.hasMany(Player);
Player.belongsTo(Game);
Game.belongsTo(Trivia);

module.exports = {
  models: {
    Game,
    Bar,
    Player,
    Trivia
  }
};
