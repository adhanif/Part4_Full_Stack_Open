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
  try {
    const blogs = await Blog.create(req.body);
    res.status(201).json(blogs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allBlogs,
  newBlog,
};
