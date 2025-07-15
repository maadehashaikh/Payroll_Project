module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "user_roles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return UserRole;
};
