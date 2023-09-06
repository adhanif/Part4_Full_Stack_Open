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

describe("all blogs are returned", () => {
  test("correct amount of blogs are returened as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("blog post has id property", () => {
  test("blog post has id property and does not have _id property", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blog = response.body[0];
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

describe("addition of a new blog", () => {
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
});

describe("missing likes set to zero", () => {
  test("if the likes property is missing from the request", async () => {
    const newBlog = {
      title: "Announcing TypeScript 5.2",
      author: "Daniel Rosenwasser",
      url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });
});

describe("fails with statuscode 400 when title or url missing", () => {
  test("title or url properties are missing then status code 400 Bad Request", async () => {
    const newBlog = {
      author: "Daniel Rosenwasser",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 after deletion", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
