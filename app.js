const express = require("express");
const middleware = require("./utils/middleware");
const cors = require("cors");

const app = express();

//

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { app };
