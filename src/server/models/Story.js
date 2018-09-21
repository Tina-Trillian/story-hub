const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String, 
    required: true,
  },
  originalAuthorId: {
    type: Schema.Types.ObjectId, //User who started the story
    required: true,
    ref: "User"
  },
  originalAuthorName: {
    type: String,
    required: true,
  },
  //might be that I take it out later and take the author name from the
  //author object
  contributors: [{
    type: Schema.Types.ObjectId, //All users who contributed to the story
    ref: "User",
    default: []
  }],
  tagline: {
    type: String,
    required: true,
  },
  content: [{
    type: Schema.Types.ObjectId,
    ref: "Part"
  }], //PartIds will be stored here to form the story
  //may be required later, depends on whether User will add a first Part by creating the story
  tag: {
    type: [String],
    default: ["none"]
  }, //Tags can be decided by the original Auhtor, can be any String
  genre: {
    type: [String],
    enum: [
      "none",
      "action",
      "adventure",
      "crime",
      "drama",
      "fantasy",
      "gothic",
      "historical",
      "horror",
      "mystery",
      "paranormal",
      "political",
      "romance",
      "science-fiction",
      "superhero",
      "thriller",
      "urban",
      "western"
    ],
    default: ["none"]
  }, //Story can have more than one genre, but it has to be one of the above
  //genre is set by the original author
  picture: {
    type: String,
    default: "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7491eb281478f3b97661bae38cbcb34b&auto=format&fit=crop&w=751&q=80"
  },
  characters: [{
    type: Schema.Types.ObjectId,
    ref: "Character",
    default: [],
  }], //CharacterIds will be stored here, characters can be added by every contributer
  
  is_being_updated: {
    type: Boolean,
    default: false,
  }, //Will later help, that not two persons are working on the same story
  //at the same time, will turn to true, while writing Part for the story
  //and will revert back to false, when Part is saved
  is_finished: {
    type: Boolean,
    default: false,
  }, //For now only the orginal author can "close" a story
  is_public: {
    type: Boolean,
    default: true
  },
  is_moderated: {
    type: Boolean,
    default: false,
  }
  
  //moderated and approved will play a role later - for now every story added
  //will be public and everybody can contribute ie moderated will be false
});

module.exports = mongoose.model("Story", storySchema);


