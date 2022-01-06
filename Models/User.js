const mongoose = require('mongoose');


var UserModel =  mongoose.Schema({
    u_mail : String,
    u_password: String,
    u_name:String ,
    u_classe: String,
    u_photo:String ,
    u_role:String,
    u_description : String
}, {timestamps: true});

const User =mongoose.model('user', UserModel);
module.exports = { User };