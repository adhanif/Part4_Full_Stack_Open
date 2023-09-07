const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../controllers/usersController");

usersRouter.post("/", createUser);

module.exports = {
  usersRouter,
};
