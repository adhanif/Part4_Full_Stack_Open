const express = require("express");
const usersRouter = express.Router();
const { createUser, allUsers } = require("../controllers/usersController");

usersRouter.get("/", allUsers);
usersRouter.post("/", createUser);

module.exports = {
  usersRouter,
};
