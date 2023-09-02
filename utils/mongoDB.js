require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    logger.info("Connected to the database");
  })
  .catch((err) => {
    logger.error("Lost connection to the database", err);
  });
