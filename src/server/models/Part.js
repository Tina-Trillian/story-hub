const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new Schema({
  story: {
    type: Schema.Types.ObjectId,
    ref: "Story"
  }, //The Story the part belongs to
  content: String, //with markup Language
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }, //Author of the part not the Story!
  authorName: String, //Username of Author for display purposes
  index_story: Number, //index of the Parts-Array in Story Model - to make sure the parts are displayed in the right order
  is_moderated: {
    type: Boolean,
    default: false //is passed down from story model
  },
  is_approved: {
    type: Boolean,
    default: true //changes to false, when story is moderated and the original User has not yet approved
  }
  //moderated and approved will play a role later - for now every story added
  //will be public and everybody can contribute
});

module.exports = mongoose.model("Part", partSchema);
