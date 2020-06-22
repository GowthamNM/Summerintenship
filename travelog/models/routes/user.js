//user.js

var mongoose = require("mongoose");
var plm =require("passport-local-mongoose");
var bcrypt=require('bcrypt')
var UserSchema = new mongoose.Schema({

username:String,
password:String,
email:String,
phone:String,
name:String
});
UserSchema.plugin(plm);

var User=module.exports = mongoose.model("User",UserSchema);

module.exports.createUser = function(newUser,callback){
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newUser.password,salt,function(err,hash){
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.getUserByUsername = function(username,callback){
	var query ={username: username};
	User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
	User.find(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){
		if(err) throw err;
		callback(null,isMatch);
	});
}