const express = require("express");
const blogsRouter = express.Router();

const {
  allBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogsController");

blogsRouter.get("/", allBlogs);
blogsRouter.post("/", newBlog);
blogsRouter.delete("/:id", deleteBlog);
blogsRouter.put("/:id", updateBlog);

module.exports = {
  blogsRouter,
};
