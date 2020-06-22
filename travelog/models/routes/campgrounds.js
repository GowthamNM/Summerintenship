var express = require("express");
var router = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

router.use(bodyParser.urlencoded({extended:true}));
router.use('/', express.static('../public'))

var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var campground = mongoose.model("index",campgroundSchema);



router.get("/",function(req,res){
	campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds:allcampgrounds});
		}
	});
    
});

router.post("/",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.desc
	var newcampground={name: name,image: image,description:description};
	campground.create(newcampground,function(err,newlycreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/");
		}
	});
});

router.get("/new",function(req,res){
	res.render("new");
});

router.get("/:id",function(req,res){
	campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground:foundCampground});
		}
	});
});



router.get("/:id/edit",function(req,res){
	res.send("Campground router");
});