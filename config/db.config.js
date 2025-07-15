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
db.RolePrivilege = require("../models/role_privileges.model.js")(
  sequelize,
  Sequelize
);

// One User has one UserRole (bridge entry)
db.User.hasOne(db.UserRole, { foreignKey: "userId" });
db.UserRole.belongsTo(db.User, { foreignKey: "userId" });

// One Role can be assigned to many users through UserRole
db.Role.hasMany(db.UserRole, { foreignKey: "roleId" });
db.UserRole.belongsTo(db.Role, { foreignKey: "roleId" });

// Role ↔ Privilege (Many-to-Many through role_privileges)

db.Role.belongsToMany(db.Privilege, {
  through: db.RolePrivilege,
  foreignKey: "roleId",
});
db.Privilege.belongsToMany(db.Role, {
  through: db.RolePrivilege,
  foreignKey: "privilegeId",
});

// BelongsTo for bridge table querying
db.RolePrivilege.belongsTo(db.Role, { foreignKey: "roleId" });
db.RolePrivilege.belongsTo(db.Privilege, { foreignKey: "privilegeId" });

db.Menu.belongsToMany(db.Privilege, {
  through: "privilege_menus",
  foreignKey: "menuId",
});

module.exports = db;
