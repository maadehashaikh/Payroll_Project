const express = require("express");
const router = express.Router();
const privilegeController = require("../controllers/privilege.controller.js");

router.post("create-privilege", privilegeController.createPrivilege);
module.exports = router;
