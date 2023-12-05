const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
  sequelize.define('platform', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    { freezeTableName: true, timestamps: false }
  );
};
