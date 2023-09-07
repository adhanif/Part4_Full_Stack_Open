const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  const { username, name, password } = req.body;
  console.log(req.body);
};

module.exports = { createUser };
