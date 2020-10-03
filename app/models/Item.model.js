const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const itemSchema = ({
    name:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Item',itemSchema);