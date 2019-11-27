var express     = require("express"),
 app 			= express(),
 bodyParser     = require("body-parser"),
mongoose 	    = require("mongoose"),
 passport       = require("passport"),
  flash         = require("connect-flash"),
 LocalStrategy  = require("passport-local"),
 methodOverride = require("method-override"),
 Animes 		= require("./model/Animes"),
Comment 		= require("./model/comment"),
 User 			= require("./model/user"),
 seedDB 		= require("./seeds");

//requiring routes
var commentsRoutes    = require("./routes/comments"),
    animesRoutes     = require("./routes/animes"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/Anime");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"best romance anime",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	//`req.user` contains the authenticated user
	//pass this params to every page
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/Animes", animesRoutes);
app.use("/Animes/:id/comments", commentsRoutes);




	







app.listen(3000,function(){
	console.log("Page Started On Port 3000");
});
