const express = require("express");
const blogsRouter = express.Router();
const { allBlogs } = require("../controllers/blogsController");

blogsRouter.get("/", allBlogs);

module.exports = {
  blogsRouter,
};
