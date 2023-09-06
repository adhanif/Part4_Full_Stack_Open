const express = require("express");
const blogsRouter = express.Router();
const {
  allBlogs,
  newBlog,
  deleteBlog,
} = require("../controllers/blogsController");

blogsRouter.get("/", allBlogs);
blogsRouter.post("/", newBlog);
blogsRouter.delete("/:id", deleteBlog);

module.exports = {
  blogsRouter,
};
