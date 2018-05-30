const Game = require('./models/Game.js');
const Bar = require('./models/Bar.js');
const Team = require('./models/Team.js');
const Question = require('./models/Question.js');

Game.hasMany(Team);
Team.belongsTo(Game);
Question.belongsTo(Game);

module.exports = {
  models: {
    Game,
    Bar,
    Team,
    Question
  }
};
