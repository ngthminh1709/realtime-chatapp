const express = require("express");
const methodOverride = require("method-override");
const expressEjsExtend = require("express-ejs-extend");
const bodyParser = require("body-parser");
const configViewEngine = require("./configs/viewEngine");

const app = express();
const port = 3000;


configViewEngine(app);

// configViewEngine(app);

app.engine("ejs", expressEjsExtend);
app.use(express.static('./src/public'))
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));


app.listen(port, () => {
  console.log("Server is running at: " + port);
});
