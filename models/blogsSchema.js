const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogsSchema);

module.exports = Blog;
