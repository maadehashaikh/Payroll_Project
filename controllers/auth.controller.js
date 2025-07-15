const db = require("../config/db.config.js");
const { User, Role, Privilege, Menu } = db;
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match." });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with roleId
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await user.destroy(); // If using `paranoid: true`, this will soft delete
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required!",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    // const user = await User.findOne({
    //   where: { email },
    //   include: {
    //     model: Role,
    //     include: {
    //       model: Privilege,
    //       include: [Menu],
    //     },
    //   },
    // });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    if (user.role !== role.toLowerCase()) {
      return res.status(403).send({ message: "Incorrect role!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.send({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        // roles: [
        //   {
        //     id: user.role.id,
        //     name: user.role.name,
        //     privileges: user.role.privileges.map((privilege) => ({
        //       id: privilege.id,
        //       name: privilege.name,
        //       menus: privilege.menus.map((menu) => ({
        //         id: menu.id,
        //         name: menu.name,
        //         path: menu.path,
        //       })),
        //     })),
        //   },
        // ],
      },
    });
  } catch (err) {
    res.status(500).send({ message: "Server error: " + err.message });
  }
}

async function getUser(req, res) {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email"],
  });
  res.json(user);
}

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  getUser,
};
