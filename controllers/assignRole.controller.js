const db = require("../config/db.config.js");
const { User, Role, UserRole } = db;

async function assignRoleToUser(req, res) {
  const { userId } = req.params;
  const { roleId } = req.body;

  if (!roleId) {
    return res.status(400).send({ message: "Role ID is required." });
  }

  try {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).send({ message: "User or Role not found." });
    }

    await UserRole.create({ userId, roleId });
    res.status(201).json({
      message: "Role assigned to user.",
      userId,
      roleId,
    });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).send({ message: "Internal server error." });
  }
}

async function getAllUserRoles(req, res) {
  try {
    const mappings = await UserRole.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });

    res.status(200).json({ success: true, mappings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateUserRole(req, res) {
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const mapping = await UserRole.findOne({ where: { userId } });
    if (!mapping)
      return res.status(404).json({ message: "Mapping not found." });

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: "Role not found." });

    mapping.roleId = roleId;
    await mapping.save();

    res.json({ success: true, message: "User's role updated.", mapping });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUserRole(req, res) {
  const { userId } = req.params;
  try {
    const mapping = await UserRole.findOne({ where: { userId } });
    if (!mapping)
      return res.status(404).json({ message: "Mapping not found." });
    await mapping.destroy();
    res.json({ success: true, message: "User role mapping deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  assignRoleToUser,
  getAllUserRoles,
  updateUserRole,
  deleteUserRole
};
