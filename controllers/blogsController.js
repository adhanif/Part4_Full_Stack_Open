const { response } = require("express");
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
    const person = req.body;
    console.log(person);
    const blogs = await Blog.create(person);
    res.status(201).json(person);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allBlogs,
  newBlog,
};
