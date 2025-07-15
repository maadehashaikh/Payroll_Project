const db = require("../config/db.config");
const Role = db.Role;

async function createRole(req, res) {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Role name is required" });
  try {
    const newRole = await Role.create({ name });
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (err) {
    console.error("Create Role Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function getAllRoles(req, res) {
  try {
    const roles = await Role.findAll();
    res.status(200).json({
      success: true,
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateRole(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    role.name = name;
    await role.save();

    res.json({ success: true, message: "Role updated", data: role });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteRole(req, res) {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    await role.destroy();
    res.json({ success: true, message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { createRole, getAllRoles, updateRole, deleteRole };
