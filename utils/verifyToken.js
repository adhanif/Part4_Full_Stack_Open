const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (!authorization) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      authorization1 = authorization.replace("bearer ", "");
    }

    const decodedToken = jwt.verify(authorization1, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.user = decodedToken;

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
