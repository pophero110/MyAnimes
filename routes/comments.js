var express = require("express");
var router  = express.Router({mergeParams: true});
var Comment = require("../model/comment")
var middleware = require("../middleware");
var Animes = require("../model/Animes")

//======================
//   comments routes
//======================

//create an new comment page
router.get("/new",middleware.isLoggedIn, function(req,res){
	console.log(req.params.id);
	Animes.findById(req.params.id,function(err,foundAnime){
		if (err){
			console.log("err333")
		}else{

		res.render("comments/new",{Animes:foundAnime});
		}
	})
  
})

//create comment logic
router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup id
	Animes.findById(req.params.id,function(err,foundAnime){
		if(err){
			console.log(err)
			res.redirect("/Animes");

		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err)
				}else{
					//add username and id, then save comment
					comment.author.id  = req.user._id;
					comment.author.username= req.user.username;
					comment.save();
					//save comment to user
				    foundAnime.comment.push(comment);
				    foundAnime.save();
				    res.redirect("/Animes/" + foundAnime._id);
				}
			})
		}
	})
})	

//show edit comment page
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			console.log(err)
		}else{
			res.render("comments/edit",{Animes_id:req.params.id,comment:foundComment})
		}
	})
	

})

//update a comment logic
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect("/Animes/" + req.params.id)
		}
	})
})

//delete a comment logic
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/Animes/" + req.params.id)
		}
	})
})

module.exports = router;