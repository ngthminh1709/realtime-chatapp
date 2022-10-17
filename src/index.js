const express = require("express");
const methodOverride = require("method-override");
const expressEjsExtend = require("express-ejs-extend");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


// configViewEngine(app);

app.engine("ejs", expressEjsExtend);
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  return res.render("main");
});

app.get("/login", (req, res) => {
  return res.render("auth/login");
});

app.get("/register", (req, res) => {
  return res.render("auth/register");
});

app.listen(port, () => {
  console.log("Server is running at: " + port);
});
