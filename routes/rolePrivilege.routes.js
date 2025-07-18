const express = require("express");
const router = express.Router();
const controller = require("../controllers/rolePrivilege.controller.js");

router.post("/create-role-privileges", controller.createRolePrivilege);
router.get("/get-all-role-privileges", controller.getAllRolePrivileges);
router.put("/update-role-privilege/:id", controller.updateRolePrivilege);

module.exports = router;
