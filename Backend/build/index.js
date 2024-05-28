"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var initWebRoutes = require("./route/route");
var connectDB = require('./config/connectDB');
var cors = require('cors');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var app = express();
app.use(cookieParser());
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
var corsOptions = {
  origin: "".concat(process.env.REACT_URL),
  credentials: true
};
app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect , this include http not only port of FrontEnd
//     res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','text/plain');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

initWebRoutes(app);
connectDB();
app.listen(5000, function () {
  console.log("Server running on 5000");
});