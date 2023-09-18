const testingRouter = rquire("express").Router();

const resetDatabase = require("../controllers/testingController");

testingRouter.post("/reset", resetDatabase);

module.exports = testingRouter;
