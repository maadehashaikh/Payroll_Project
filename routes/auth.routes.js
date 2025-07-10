const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const authenticateToken = require("../middleware/auth.middleware.js");

// Route to create a new user
router.post("/signin", function (req, res) {
  authController.createUser(req, res);
});

// Route to get all users
router.get("/getallusers", function (req, res) {
  authController.getAllUsers(req, res);
});

// Route to update user using its id
router.put("/updateuser/:id", function (req, res) {
  authController.updateUser(req, res);
});

//Route to delete user using its id
router.delete("/deleteuser/:id", function (req, res) {
  authController.deleteUser(req, res);
});

// Route to login a user
router.post("/login", function (req, res) {
  authController.loginUser(req, res);
});

//Route to get user profile
router.get("/profile", authenticateToken, function (req, res) {
  authController.getUser(req, res);
});

module.exports = router;
