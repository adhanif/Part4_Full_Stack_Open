const express = require("express");
const blogsRouter = express.Router();
const { allBlogs, newBlog } = require("../controllers/blogsController");

blogsRouter.get("/", allBlogs);
blogsRouter.post("/", newBlog);

module.exports = {
  blogsRouter,
};
