require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    logger.info("Connected to the database");
  })
  .catch((error) => {
    logger.error("Lost connection to the database", error.message);
  });
