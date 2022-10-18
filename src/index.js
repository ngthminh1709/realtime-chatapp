const express = require("express");
const methodOverride = require("method-override");
const expressEjsExtend = require("express-ejs-extend");
const bodyParser = require("body-parser");
const route = require("./routes");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./utils/connectDB");
const app = express();
const port = 3000;

dotenv.config();
db.connect();

app.engine("ejs", expressEjsExtend);

app.use(express.static("./src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json({ limit: "5mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use(methodOverride("_method"));


const httpServer = http.createServer(app);

const io = new Server(httpServer);
    
io.on('connection', (socket) =>{
    console.log('a user connectected');
    socket.on('disconnect', () => {
        console.log('a user disconnect');
    })
})


route(app);

httpServer.listen(port, () => {
  console.log("Server is running at: " + port);
});
