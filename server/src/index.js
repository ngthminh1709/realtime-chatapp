const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log("Server is running at: " + port);
});
