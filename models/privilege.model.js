module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define(
    "privilege",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Privilege;
};
