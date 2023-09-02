const express = require("express");
const middleware = require("./utils/middleware");
const cors = require("cors");
const app = express();
const { blogsRouter } = require("./routes/blogsRoutes");

//
app.use(cors());
app.use(express.json());

app.use("/", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { app };
