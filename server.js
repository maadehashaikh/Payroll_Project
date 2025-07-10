const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./config/db.config.js");

// create table if not exists
db.sequelize.sync({ alter: true });

const authRoutes = require("./routes/auth.routes.js");
app.use("/api/auth", authRoutes);

const roleRoutes = require("./routes/role.routes.js");
app.use("/api/role", roleRoutes);

app.get("/", function (req, res) {
  res.send("Hello from maadeha");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
