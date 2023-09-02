const { app } = require("./app");
const port = 3002;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
