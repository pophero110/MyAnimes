var express = require("express");
var router  = express.Router();
var Animes = require("../model/Animes");
var middleware = require("../middleware");





// show animes list
router.get("/",middleware.isLoggedIn,function(req, res){
	//get all favouriteanimes from db
	Animes.find({}, function(err, Allanimes){
		if(err){
			console.log(err);
		} else {
			res.render("Animes/Animes",{Animes:Allanimes});
		}
	});
	
});

//create new animes page
router.get("/new",middleware.isLoggedIn,function(req, res){
	res.render("Animes/new")
});

//create logic
router.post("/",middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
	var newAnimes = {name:name, image:image,description: desc, author:author, price: price};
	// create a new favouriteanime and save to db
	Animes.create(newAnimes, function(err, newCreated){
		if(err){
			console.log(err);
		} else{
			console.log(newCreated);
			res.redirect("/Animes");
		}
	});
});

//Show a specific anime page
router.get("/:id",function(req,res){
	//get specific id and show it on the page
	Animes.findById(req.params.id).populate("comment").exec(function(err,foundAnime){
 
		if(err){
			console.log(err)
		}else{
			console.log(foundAnime);
			//render show template with that anime
			res.render("Animes/show",{Animes:foundAnime});
		}
	});
});


//destory logic
router.delete("/:id",middleware.checkAnimeOwnership,function(req,res){
	Animes.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("route error")
		}else{
			res.redirect("/Animes")	
		}
	})
})

//show editing a specific anime page(update)
router.get("/:id/edit",middleware.checkAnimeOwnership,function(req,res){
	Animes.findById(req.params.id,function(err,foundAnime){
		if(err){

		}
		res.render("Animes/edit",{Animes:foundAnime})
	})
	
})

//Updating logic(editing)
router.put("/:id",middleware.checkAnimeOwnership,function(req,res){
	Animes.findByIdAndUpdate(req.params.id,req.body.Anime,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect("/Animes")
		}
	})
})

module.exports = router;