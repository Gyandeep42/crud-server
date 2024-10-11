const mongoose = require('mongoose');
 const UserSchema = new mongoose.Schema({
    heading:String,
    content:String
 })

 const UserModel = mongoose.model("users", UserSchema)
 module.exports = UserModel