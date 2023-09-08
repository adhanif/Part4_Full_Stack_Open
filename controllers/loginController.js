const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const matchUser = await User.findOne({ username }).select("+password");
    const passwordCorrect =
      matchUser === null
        ? false
        : await bcrypt.compare(password, matchUser.passwordHash);
    if (!matchUser) {
      return res.status(401).json({
        error: "invalid username ",
      });
    } else if (!passwordCorrect) {
      return res.status(401).json({
        error: "invalid  password",
      });
    }

    const payload = {
      username: matchUser.username,
      id: matchUser._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res
      .status(200)
      .send({ token, username: matchUser.username, id: matchUser._id });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
