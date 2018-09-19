const express = require("express");
const router = express.Router();

const Story = require("../../models/Story");
const Part = require("../../models/Part");
const Character = require("../../models/Character");

const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);
//need to see later, what it does excactly!!!

router.get("/", (req, res) => {
  res.send({ message: "Hello from the stories!" });
});

// router.get('/protected', checkLoggedIn, (req, res) => {
//     console.log('USER', req.user)
//     res.send({ success: true })
// })

router.get("/all", (req, res) => {
  //will get all stories that are in the database

  Story.find({}).then(stories => {
    res.send({ stories });
  });
});

//Maybe later get a Route that searches all Stories by req.user
//and a Route that searches for all Parts by req.user

router.get("/:id", (req, res) => {
  //Will find a Story with the right Id and display it

  Story.findById(req.params.id).then(story => {
    res.send(story);
  });
});

router.delete("/:id", (req, res) => {
  //will find the Story with the right Id in the URL and delete it

  Story.findByIdAndRemove(req.params.id).then(deletedStory => {
    res.send({
      deleted: true,
      deletedStory
    });
  });
});

router.post("/:id/add", (req, res) => {
  //should be called when a Part or Character is ADDED to a story

  Story.findById(req.params.id).then(story => {
    if (req.body.content) {

      const index = story.content.length;

      const part = new Part({
        story: story._id,
        content: req.body.content,
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        index_story: index
      })

      story.content = story.content.concat([part._id]);
      story.save();
      part.save();
     
      res.send(story); //maybe it is necessary to send the part here
      //will see later
    }

    if (req.body.name) {
      const character = new Character({
        story: story._id,
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        name: req.body.name,
        description: req.body.description,
        age: req.body.age,
        gender: req.body.gender
        //later maybe a picture as well
      })

      story.characters = story.characters.concat([character._id]);
      story.save();
      character.save();

      res.send(story); //maybe is will be necessary to send the character here
      //Will see later
    }
  });
});

router.post("/:id/update", (req, res) => {
  //Should be called when the story is updated -> toggle is_being_updated
});

//might not need the edit route, as the story is "edited" through the parts and character creation
router.patch("/:id/edit", (req, res) => {
  res.send({
    message: `The story with the id: ${req.params.id} will be edited!`
  });
});

router.post("/new", (req, res) => {
  const {
    title,
    tagline,
    setting,
    genre,
    originalAuthorId,
    originalAuthorName
  } = req.body;

  //Will create a new Story with the given parameters
  //need later to check if the Booleans etc. are given or not

  new Story({
    title,
    tagline,
    setting,
    genre,
    originalAuthorId,
    originalAuthorName
  })
    .save()
    .then(story => {
      res.send(story);
    });
});

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
