const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(!err){console.log('MongoDB Connection Succeeded')}
    else {console.log('Error in DB Connection : '+ err )}
})

// awit and asyc 
// what is useUnifiedTopology
// what is useNewUrlParser

// mongodb+srv://root:<password>@cluster0-dpkci.mongodb.net/test?retryWrites=true&w=majority