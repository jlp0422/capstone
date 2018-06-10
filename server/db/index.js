const Game = require('./models/Game.js');
const Bar = require('./models/Bar.js');
const Team = require('./models/Team.js');
const Question = require('./models/Question.js');

Game.hasMany(Team);
Game.belongsTo(Bar);
Team.belongsTo(Game);
Team.belongsTo(Bar);
Bar.hasMany(Game);
Bar.hasMany(Team);
Question.belongsTo(Game);

module.exports = {
  models: {
    Game,
    Bar,
    Team,
    Question
  }
};
