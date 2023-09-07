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
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, name, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, allUsers };
