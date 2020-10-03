const express = require('Express');

// Import the library:
var cors = require('cors');

const bodyParser = require("body-parser");
// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//const mongoose = require("mongoose");

//const morgan = require("morgan");
const port = process.env.PORT || 4000;

// database connection 
require("./config/db");


// Then use it before your routes are set up:
app.use(cors());

// middleware 
app.use(express.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// 
require('./routers/api/item.routes')(app);
require('./routers/api/user.routes')(app);
require('./routers/api/auth.routes')(app);

//app.use('/api',require('./routers/api/item.routes.js'));

// use Routes
app.use(express.static('app/public'));


var Server = app.listen(4000,function(){
    console.log("Listen to port--- 4000");  
});
