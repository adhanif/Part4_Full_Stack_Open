const mongoose = require("mongoose");
const supertest = require("supertest");
const { app } = require("../app");
const Blog = require("../models/blogsSchema");
const helper = require("./blog_test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.intialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.intialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.intialBlogs[2]);
  await blogObject.save();
});

test("correct amount of blogs are returened as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.intialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
