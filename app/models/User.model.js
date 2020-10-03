const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const userSchema = ({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    register_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userSchema);