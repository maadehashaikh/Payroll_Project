module.exports = (sequelize, DataTypes) => {
  const RolePrivilege = sequelize.define("role_privileges", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    privilegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return RolePrivilege;
};
