const conn = require('../conn');
const { Sequelize } = conn;

const Bar = conn.define('bar', 
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: Sequelize.STRING,
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endOfMembershipDate: {
      type: Sequelize.DATE
    }
  }, { underscored: true }
);

module.exports = Bar;
