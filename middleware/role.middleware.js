function authorizeRoles(...allowRoles) {
  return (req, res, next) => {
    if (!req.user || !allowRoles.includes(req.user.role)) {
      return res.status(403).send({
        message: "Access denied!",
      });
    }
    next();
  };
}

module.exports = authorizeRoles;
