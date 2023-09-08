const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (authorization && authorization.startsWith("Bearer ")) {
      authorization = authorization.replace("Bearer ", "");
    }
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.decodedToken = decodedToken;

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
