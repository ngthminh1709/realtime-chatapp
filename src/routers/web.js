import { Express } from "express";
let router = express.Router();

// Init all routers 
// @param app from express module
 
let   initRoutes = (app) => {
    
app.get("/", (req, res) => {
    return res.render("main");
  });
  
  app.get("/login", (req, res) => {
    return res.render("auth/login");
  });
  
  app.get("/register", (req, res) => {
    return res.render("auth/register");
  });
}