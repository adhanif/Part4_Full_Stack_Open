// const { response } = require("express");
const Blog = require("../models/blogsSchema");
const User = require("../models/userSchema");

const allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

const newBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes = 0 } = req.body;
    const { decodedToken } = req;

    if (!title && !url) {
      return res.status(400).json({ error: " Title and URL are required" });
    } else if (!url) {
      return res.status(400).json({ error: "Url is required" });
    } else if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const creater = await User.findById(decodedToken.id);

    const newblog = await Blog.create({
      title,
      author,
      url,
      likes,
      user: creater.id,
    });

    creater.blogs = creater.blogs.concat(newblog._id);
    await creater.save();
    res.status(201).json(newblog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete({ _id: id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { likes } },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
};
