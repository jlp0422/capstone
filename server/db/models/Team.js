const conn = require('../conn');
const { Sequelize } = conn;

const Team = conn.define('team',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: Sequelize.STRING,
    team_name: Sequelize.STRING,
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    googleId: Sequelize.STRING,
    facebookId: Sequelize.STRING
  }, { underscored: true }
);

module.exports = Team;
