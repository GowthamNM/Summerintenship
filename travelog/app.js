var express = require("express");
var mongoose = require("mongoose");

var express=require("express"),
    mongoose = require("mongoose"),
    passport= require("passport"),
    bodyParser=require("body-parser"),
    User = require("./model/user"),
    //campgrounds = require("./model/campground"),
    Ls=require("passport-local"),
    plm=require("passport-local-mongoose")
    bcrypt=require('bcrypt')
var app = express();
mongoose.connect("mongodb://localhost:27017/test");
app.use(bodyParser.urlencoded({extended:true}));

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(express.static('model')); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Ls(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);
app.set('view engine','ejs');



app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('register_login.html'); 
})

app.post('/addplaces',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('Addplaces.html'); 
})


app.post("/register",function(req,res){
var name = req.body.uname;
var username = req.body.usnamee;
var password = req.body.passwordreg;
var mobile = req.body.mobileno;
var mailid = req.body.mailid;


	var newUser = new User({
		"name":name,
		"username":username,
		"password":password,
		"mobile":mobile,
		"mailid":mailid
	});
	User.createUser(newUser,function(err,user){
		if(err)throw err;
		console.log(user)
	});
	res.redirect('register_login.html');
});





passport.use(new Ls(
	function(username,password,done){
		User.getUserByUsername(username,function(err,user){
			if(err) throw err;
			if(!user){
				return done(null,false,{message:'unknown User'});
			}
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,user);
				}else{
					return done(null,false,{message:'Invalid password'});
				}
			});
		});
	}));

passport.serializeUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id,done){
	User.getUserById(id,function(err,user){
		done(err,user);
	});
});



var campgroundSchema= new mongoose.Schema({
name: String,
image:String,
visits:String,
date:String
});
var campground = mongoose.model("campground",campgroundSchema);

app.post('/campgrounds',function(req,res){
	var name=req.body.cty;
	var image=req.body.url;
	var visits=req.body.visits;
	var date=req.body.date;
	var newcampground = {name: name, image:image,visits:visits,
date:date}
	campground.create(newcampground,function(err,newlycreated){
	if(err){
		console.log(err);
	}else{
		res.render("travel.html")
}
});
	res.redirect("travel.html");
});


app.post('/update',function(req,res){
	var name=req.body.cty;
	var image=req.body.url;
	var visits=req.body.visits;
	var date=req.body.date;
	var myquery={name: name}
	var newdata = {name: name, image:image,visits:visits,
date:date}
	campground.updateOne(myquery,newdata,function(err,newlycreated){
	if(err){
		console.log(err);
	}else{
		res.render("travel.html")
}
});
	res.redirect("travel.html");
});

app.post('/delete',function(req,res){
	var name=req.body.cty;
	var image=req.body.url;
	var visits=req.body.visits;
	var date=req.body.date;
	var myquery={name: name}
	campground.remove(myquery,function(err,newlycreated){
	if(err){
		console.log(err);
	}else{
		res.render("travel.html")
}
});
	res.redirect("travel.html");
});




app.post("/login",passport.authenticate("local",{
	successRedirect:"travel.html",
	failuareRedirect:"/register_login"
}),function(req,res){
	res.redirect('/');
});

app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT ")
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out !";
});

app.listen(3000,process.env.IP,function(){
	console.log("Server started......");
})