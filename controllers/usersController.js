const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const allUsers = async (req, res) => {
  try {
    // const { username, name } = req.body;
    const users = await User.find({});
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const alreadyUser = await User.find({ username });
    if (alreadyUser.length > 0) {
      return res
        .status(400)
        .json({ error: "expected `username` to be unique" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "username must be at least 3 characters long" });
    } else if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, name, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, allUsers };
