require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to the database");
  })
  .catch((error) => {
    logger.error("Lost connection to the database", error.message);
  });
