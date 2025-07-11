const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/assignRole.controller.js");

// Route for assigning a role to a user
router.post("/assign-role/:userId", userRoleController.assignRoleToUser);

// Route for getting all user-role mappings
router.get("/getAllUserRoles", userRoleController.getAllUserRoles);

// Route for updating a user's role
router.put("/updateUserRole/:userId", userRoleController.updateUserRole);

// Route for deleting a user's role
router.delete("/deleteUserRole/:userId", userRoleController.deleteUserRole);
module.exports = router;
