 var express = require('express');
 var router =express.Router();


 router.get('/',function(req,res){
    var info = '';
    res.send(`<h1>Welcome to Node Express RestFull API</h1><br> ${info}`);
});

module.exports = router;