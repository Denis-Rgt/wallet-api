// load the things we need
var express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser')
var path = require('path');
const cors = require('cors');


var app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: "denis",
    saveUninitialized: true,
    resave: true
}))
const routes = require('./routes')
app.use('/', routes)


// Importing the database model
const Sequelize = require('sequelize');
const db = require('./db.js');

// Creating all the tables defined in agency
db.sync()

app.listen(8080);
console.log('8080 is the magic port');