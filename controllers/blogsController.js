// const { response } = require("express");
const Blog = require("../models/blogsSchema");

const allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

const newBlog = async (req, res, next) => {
  const { title, author, url, likes = 0 } = req.body;

  if (!title && !url) {
    return res.status(400).json({ error: " Title and URL are required" });
  } else if (!url) {
    return res.status(400).json({ error: "Url is required" });
  } else if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const blogs = await Blog.create({ title, author, url, likes });
    res.status(201).json(blogs);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete({ _id: id });
  res.status(204).end();
};

module.exports = {
  allBlogs,
  newBlog,
  deleteBlog,
};
