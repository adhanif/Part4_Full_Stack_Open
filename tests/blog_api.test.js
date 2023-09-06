const mongoose = require("mongoose");
const supertest = require("supertest");
const { app } = require("../app");
const helper = require("./blog_test_helper");
const Blog = require("../models/blogsSchema");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
});

// describe("",()=>{})
test("correct amount of blogs are returened as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog post has id property and does not have _id property", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blog = response.body[0];
  expect(blog.id).toBeDefined();
  expect(blog._id).toBeUndefined();
});

test("new blog and total blogs increased by one and correctly saved content", async () => {
  const newBlog = {
    title: "Announcing TypeScript 5.2",
    author: "Daniel Rosenwasser",
    url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/",
    likes: 9,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Announcing TypeScript 5.2");
});

afterAll(async () => {
  await mongoose.connection.close();
});
