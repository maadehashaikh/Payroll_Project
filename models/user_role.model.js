module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("user_roles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  });

  return UserRole;
};
