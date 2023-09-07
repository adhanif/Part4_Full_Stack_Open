const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const helper = require("./blog_test_helper");
const supertest = require("supertest");
const { app } = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  }, 100000);
});

describe("when there is initially one user in db", () => {
  // beforeEach(async () => {
  //   await User.deleteMany({});
  //   const passwordHash = await bcrypt.hash("sekret", 10);
  //   const user = new User({ username: "root", passwordHash });
  //   await user.save();
  // });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    console.log(usersAtEnd);
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe("invalid users are not created", () => {
  test("creation fails with proper statuscode when username is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "ml",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be at least 3 characters long"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe("username with password less than three char are not created", () => {
  test("creation fails with proper statuscode when password is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mluukkai32",
      name: "Matti Luukkainen",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
