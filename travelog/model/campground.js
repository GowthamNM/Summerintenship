var express = require("express");
var mongoose = require("mongoose");
var bodyParser=require("body-parser");

var campgroundSchema= new mongoose.Schema({
name: String,
image:String,
visits:String,
date:String
});
var campground = mongoose.model("campground",campgroundSchema);
