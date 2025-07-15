const express = require("express");
const router = express.Router();
const privilegeController = require("../controllers/privilege.controller.js");

router.post("/create-privilege", privilegeController.createPrivilege);
router.get("/getAllPrivileges", privilegeController.getAllPrivileges);
router.get("/getPrivilegeById/:id", privilegeController.getPrivilegeById);
router.put("/updatePrivilege/:id", privilegeController.updatePrivilege);
router.delete("/deletePrivilege/:id", privilegeController.deletePrivilege);

module.exports = router;
