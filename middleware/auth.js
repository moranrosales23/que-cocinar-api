const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const tk =
    req.body.tk || req.headers["authorization"] || req.headers["Authorization"];
  if (!tk) return res.status(401).send({ message: "Token not found" });
  try {
    const decoded = jwt.verify(
      tk.split("Bearer ")[1],
      process.env.JWT_KEY_SECRET
    );
    req.body._user_id = decoded.id;
    console.log(decoded);
  } catch (error) {
    return res.status(403).send({ message: "Invalid token" });
  }
  return next();
};

module.exports = isAuthenticated;
