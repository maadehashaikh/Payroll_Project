const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

// Route to create a new role
router.post("/createrole", roleController.createRole);

//Route to get all roles
router.get("/getallroles", roleController.getAllRoles);

//Route to update a role
router.put("/updaterole/:id", roleController.updateRole);

//Route to delete a role
router.delete("/deleterole/:id", roleController.deleteRole);

module.exports = router;
