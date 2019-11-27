var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../model/user");


//landing page

router.get("/", function(req, res){
	res.render("index");
});

//register page
router.get("/register",function(req,res){
	res.render("register")
})

//register logic
router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username})
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err)
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome To The Best Romance Animes Channel")
			res.redirect("/Animes")
		})
	})
});

//login page
router.get("/login",function(req,res){
	res.render("login")
});

//login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/Animes",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout logic
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success","You have logged out~")
	res.redirect("/")
});



module.exports = router;