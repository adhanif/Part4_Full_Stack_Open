const express = require("express");
require("./mongoDB");
const middleware = require("./utils/middleware");
const cors = require("cors");
const app = express();
const { blogsRouter } = require("./routes/blogsRoutes");
const { usersRouter } = require("./routes/usersRoutes");

//
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { app };
