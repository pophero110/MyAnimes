var mongoose = require("mongoose");
var Animes = require("./model/Animes");
var Comment = require("./model/comment");


var myAnime = [
{
	name:"Future Diary",
	image:"https://i2.wp.com/attackongeek.com/wp-content/uploads/2016/02/FD.jpg?fit=1000%2C562&ssl=1",
	description:"blah blah blah blah"
},
{
	name:"Golden Time",
	image:"https://www.rightstufanime.com/images/productImages/9781626926721_manga-golden-time-9-primary.jpg",
	description:"blah blah blah blah"

},
{
	name:"Maid Sama!",
	image:"https://images-na.ssl-images-amazon.com/images/I/61fdLJa0pWL._UX425_.jpg",
	description:"blah blah blah blah"
}
];


function seedDB(){
	Comment.remove({},function(err){
		console.log("Remove All comments")
	});
	Animes.remove({},function(err){
		if(err){
			console.log(err)
		}
		console.log("Remove All The DB")
		myAnime.forEach(function(myAnime){
			Animes.create(myAnime,function(err, Animes){
				if(err){
					console.log(err)
				}else{
					console.log("Added an anime");
					Comment.create(
					{
						text:"this is the best romance anime i have ever watched",
						author:"Jeff"
					},function(err, createCom){
						Animes.comment.push(createCom);
						Animes.save();
						console.log("Add a comment");
					})
					

				};

				
			});
			
		});
	});
}	


module.exports = seedDB;
