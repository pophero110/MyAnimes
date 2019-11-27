var mongoose = require("mongoose");
// SCHEMA SETUP

var MyAnimeSchema = new mongoose.Schema({
   name: String,
   price:String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comment: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Animes", MyAnimeSchema);
   