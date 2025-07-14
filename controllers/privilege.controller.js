const db = require("../config/db.config");
const Privilege = db.Privilege;

async function createPrivilege(req, res) {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Privilege name is required." });
  try {
    const newPrivilege = await Privilege.create({ name });
    res.status(201).json({
      success: true,
      message: "Privilege created successfully.",
      privilege: newPrivilege,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createPrivilege };
