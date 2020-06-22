var express = require("express");
var    app = express();
var    bodyParser = require("body-parser");
var    mongoose = require("mongoose");
var    path = require('path');
var    passport= require("passport");
var    bodyParser=require("body-parser");
var    User = require("./routes/user");
var    Ls=require("passport-local");
var    plm=require("passport-local-mongoose");
var    bcrypt=require('bcrypt');
var    methodOverride = require("method-override");
//var campgroundroutes = require("routes");

app.use('/campgrounds', express.static('public'))
app.use('/campgrounds/mybucketplace', express.static('public'))
app.use('/campgrounds/myvisitedplace', express.static('public'))

app.use('/campgrounds/mybucketplace/:id/edit', express.static('public'))
app.use('/campgrounds/myvisitedplace/:id/edit', express.static('public'))
app.use('/campgrounds/:id/edit', express.static('public'))

mongoose.connect("mongodb://localhost:27017/test")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static('public'));

//app.use("/campgrounds",campgroundroutes);
app.use(methodOverride("_method"));

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});


app.use('/',express.static('routes')); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Ls(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);

//app.use('/campgrounds', express.static(path.join(__dirname, 'public')))
//app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
	res.render("loginreg");
});


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
	res.redirect('loginreg');
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



app.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds/myvisitedplace",
	failuareRedirect:"/"
}),function(req,res){
	res.redirect('/');
});

app.get('/logout', function(req, res){
  console.log("LOGGIN OUT")
  req.logout();
  res.redirect('/');
});



var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	visits:String,
	dates:String
});

var campground = mongoose.model("index",campgroundSchema);



app.get("/campgrounds",function(req,res){
	campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds:allcampgrounds});
		}
	});
    
});
app.get("/campgrounds/mybucketplace",function(req,res){
	campground.find({visits:"BUCKET-LIST"},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("indexmybucket",{campgrounds:allcampgrounds});
		}
	});
    
});


app.get("/campgrounds/myvisitedplace",function(req,res){
	campground.find({visits:"VISITED"},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("indexmyvisited",{campgrounds:allcampgrounds});
		}
	});
    
});


app.post("/campgrounds",function(req,res){
	var name = req.body.cty;
	var image = req.body.url;
	var description = req.body.desc;
	var visits = req.body.visits;
	var dates = req.body.date;
	var newcampground={name: name,image: image,description:description,visits: visits,dates:dates};
	campground.create(newcampground,function(err,newlycreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

/*app.get("/campgrounds/:id",function(req,res){
	campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground:foundCampground});
		}
	});
});*/

app.get("/campgrounds/:id/edit",function(req,res){
	campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.render("edit",{campground:foundCampground});
		}
	});
});


app.get("/campgrounds/myvisitedplace/:id/edit",function(req,res){
	campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect("/campgrounds/myvisitedplace");
		}else{
			res.render("editmyvisited",{campground:foundCampground});
		}
	});
});


app.get("/campgrounds/mybucketplace/:id/edit",function(req,res){
	campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			res.redirect("/campgrounds/mybucketplace");
		}else{
			res.render("editmybucket",{campground:foundCampground});
		}
	});
});


app.put("/campgrounds/:id",function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.delete("/campgrounds/:id",function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});






app.listen(3000,process.env.IP,function(){
	console.log("Travelog Server is running");
});