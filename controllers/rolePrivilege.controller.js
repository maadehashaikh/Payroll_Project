const db = require("../config/db.config.js");
const { Role, Privilege, RolePrivilege } = db;

async function createRolePrivilege(req, res) {
  const { roleId, privilegeIds } = req.body;
  if (!roleId || !Array.isArray(privilegeIds) || privilegeIds.length === 0) {
    return res
      .status(400)
      .json({ message: "roleId and privilegeIds are required." });
  }

  try {
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: "Role not found." });

    // Optional: Validate that all privilege IDs exist
    const privileges = await Privilege.findAll({
      where: { id: privilegeIds },
    });
    if (privileges.length !== privilegeIds.length) {
      return res
        .status(400)
        .json({ message: "Some privilege IDs are invalid." });
    }

    const rolePrivilegeData = privilegeIds.map((pid) => ({
      roleId,
      privilegeId: pid,
    }));

    const createdMappings = await RolePrivilege.bulkCreate(rolePrivilegeData);

    res.status(201).json({
      message: "Privileges assigned to role successfully.",
      mappings: createdMappings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAllPrivileges(req, res) {
  try {
    const mappings = await RolePrivilege.findAll({
      include: [
        { model: Role, attributes: ["id", "name"] },
        { model: Privilege, attributes: ["id", "name"] },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Privileges retrieved successfully.",
      data: mappings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createRolePrivilege,
  getAllPrivileges,
};
