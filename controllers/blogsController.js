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
  try {
    const blogs = await Blog.create({ title, author, url, likes });
    res.status(201).json(blogs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allBlogs,
  newBlog,
};
