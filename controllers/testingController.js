const Blog = require("../models/blogsSchema");
const User = require("../models/userSchema");

const resetDatabase = async (req, res, next) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = resetDatabase;
