const express = require("express");
const methodOverride = require("method-override");
const expressEjsExtend = require("express-ejs-extend");
const bodyParser = require("body-parser");
const route = require("./routes");
const dotenv = require("dotenv");

const UserRouter = require('./routes/user')

const db = require("./utils/connectDB");
const app = express();
const port = 3000;

dotenv.config();

db.connect();

app.engine("ejs", expressEjsExtend);
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

route(app);

app.listen(port, () => {
  console.log("Server is running at: " + port);
});
