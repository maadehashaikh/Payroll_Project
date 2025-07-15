const db = require("../config/db.config");
const Privilege = db.Privilege;

async function createPrivilege(req, res) {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Privilege name is required." });
  try {
    const newPrivilege = await Privilege.create({ name });
    res.status(201).json({
      success: true,
      message: "Privilege created successfully.",
      data: newPrivilege,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getAllPrivileges(req, res) {
  try {
    const privileges = await Privilege.findAll();
    res.status(200).json({
      success: true,
      message: "All privileges retrieved successfully.",
      data: privileges,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getPrivilegeById(req, res) {
  const { id } = req.params;
  try {
    const privilege = await Privilege.findByPk(id);
    if (!privilege) {
      return res
        .status(404)
        .json({ success: false, message: "Privilege not found." });
    }
    res.status(200).json({
      success: true,
      message: "Privilege retrieved successfully.",
      data: privilege,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updatePrivilege(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const privilege = await Privilege.findByPk(id);
    if (!privilege) {
      return res
        .status(404)
        .json({ success: false, message: "Privilege not found." });
    }
    privilege.name = name;
    await privilege.save();
    res.status(200).json({
      success: true,
      message: "Privilege updated successfully.",
      data: privilege,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deletePrivilege(req, res) {
  const { id } = req.params;
  try {
    const privilege = await Privilege.findByPk(id);
    if (!privilege) {
      return res
        .status(404)
        .json({ success: false, message: "Privilege not found." });
    }
    await privilege.destroy();
    res
      .status(200)
      .json({ success: true, message: "Privilege deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createPrivilege,
  getAllPrivileges,
  getPrivilegeById,
  updatePrivilege,
  deletePrivilege,
};
