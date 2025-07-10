const Sequelize = require("sequelize");
const dbname = "user";
const dbUser = "root";
const dbPassword = "root";

const sequelize = new Sequelize(dbname, dbUser, dbPassword, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.Role = require("../models/role.model.js")(sequelize, Sequelize);
db.Menu = require("../models/menu.model.js")(sequelize, Sequelize);
db.Privilege = require("../models/privilege.model.js")(sequelize, Sequelize);
db.UserRole = require("../models/user_role.model.js")(sequelize, Sequelize);
// Users ->  Roles
db.User.hasOne(db.UserRole, { foreignKey: "userId" });
db.UserRole.belongsTo(db.User, { foreignKey: "userId" });

// Role → UserRole (One-to-Many)
db.Role.hasMany(db.UserRole, { foreignKey: "roleId" });
db.UserRole.belongsTo(db.Role, { foreignKey: "roleId" });
// db.Role.hasMany(db.User, { foreignKey: "roleId" });
// db.User.belongsTo(db.Role, { foreignKey: "roleId" });

db.Role.belongsToMany(db.Privilege, {
  through: "role_privileges",
  foreignKey: "roleId",
});
db.Privilege.belongsToMany(db.Role, {
  through: "role_privileges",
  foreignKey: "privilegeId",
});

db.Privilege.belongsToMany(db.Menu, {
  through: "privilege_menus",
  foreignKey: "privilegeId",
});
db.Menu.belongsToMany(db.Privilege, {
  through: "privilege_menus",
  foreignKey: "menuId",
});

module.exports = db;
