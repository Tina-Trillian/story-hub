const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  story: {
    type: Schema.Types.ObjectId, //story the character "belongs" to
    required: true,
    ref: "Story"
  },
  authorId: {
    type: Schema.Types.ObjectId, //User who added the character to the story
    required: true,
    ref: "User"
  },
  authorName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "other"]
  }
  //later can add a Picture for character aswell
});

module.exports = mongoose.model("Character", characterSchema);
