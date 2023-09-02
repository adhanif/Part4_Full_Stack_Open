const allBlogs = async (req, res, next) => {
  try {
    res.send("it is working");
  } catch (error) {}
};

module.exports = {
  allBlogs,
};
