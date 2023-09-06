const Blog = require("../models/blogsSchema");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 17,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const blogsInDb = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
  } catch (error) {
    console.log(error);
  }
};
module.exports = { initialBlogs, blogsInDb };
