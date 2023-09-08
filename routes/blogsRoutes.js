const express = require("express");
const blogsRouter = express.Router();
const verifyToken = require("../utils/verifyToken");

const {
  allBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogsController");

blogsRouter.get("/", allBlogs);
blogsRouter.post("/", verifyToken, newBlog);
blogsRouter.delete("/:id", verifyToken, deleteBlog);
blogsRouter.put("/:id", updateBlog);

module.exports = {
  blogsRouter,
};
