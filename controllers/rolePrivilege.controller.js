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

async function getAllRolePrivileges(req, res) {
  try {
    const data = await RolePrivilege.findAll({
      include: [
        { model: Role, attributes: ["id", "name"] },
        { model: Privilege, attributes: ["id", "name"] },
      ],
    });

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No privileges found." });
    }

    res.status(200).json({
      success: true,
      message: "Privileges retrieved successfully.",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateRolePrivilege(req, res) {
  const { id } = req.params;
  const { roleId, privilegeId } = req.body;

  if (!roleId || !privilegeId) {
    return res
      .status(400)
      .json({ message: "roleId and privilegeId are required." });
  }

  try {
    const mapping = await RolePrivilege.findByPk(id);
    if (!mapping)
      return res
        .status(404)
        .json({ success: false, message: "Mapping not found." });

    const role = await Role.findByPk(roleId);
    const privilege = await Privilege.findByPk(privilegeId);

    if (!role || !privilege) {
      return res
        .status(404)
        .json({ success: false, message: "Role or Privilege not found." });
    }

    mapping.roleId = roleId;
    mapping.privilegeId = privilegeId;
    await mapping.save();

    res.json({
      success: true,
      message: "Role and its corresponding privilege updated successfully.",
      data: mapping,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteRolePrivilege(req, res) {
  const { id } = req.params;

  try {
    const mapping = await RolePrivilege.findByPk(id);
    if (!mapping)
      return res
        .status(404)
        .json({ success: false, message: "Mapping not found." });

    await mapping.destroy();

    res.json({ success: true, message: "Mapping deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createRolePrivilege,
  getAllRolePrivileges,
  updateRolePrivilege,
  deleteRolePrivilege,
};
