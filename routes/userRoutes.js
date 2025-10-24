const express = require("express");
const asynchandler = require("express-async-handler");
const { register, login, current } = require("../controller/userapi.js");
const validtoken = require("../middleware/validatetokenhandle.js");
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/current", validtoken, current);

module.exports = Router;
