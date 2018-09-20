const express = require("express");
const router = express.Router();

const Story = require("../../models/Story");
const Part = require("../../models/Part");
const Character = require("../../models/Character");
const User = require("../../models/User");


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

router.get("/all-genre", (req, res) => {
  //will get all genres for later to display
  res.send(Story.schema.tree.genre.enum)
});

router.get("/all", (req, res) => {
  //will get all stories that are in the database

  Story.find({}).then(stories => {
    res.send({ stories });
  });
});



//Get all contributors for story
router.get("/:id/contributors", (req, res) => {
  Story.findById(req.params.id)
  .populate("originalAuthorId")
  .populate("contributors")
  .then(story => {
    res.send({
      originalAuthor: story.originalAuthorId,
      contributors: story.contributors
    })
  })
})

//Get all characters for story
//TO TEST
router.get("/:id/characters", (req, res) => {

  Story.findById(req.params.id)
  .populate("characters")
  .then(story => {
    res.send(story.characters);
  });
});

//Get all content for story
//TO TEST
router.get("/:id/content", (req, res) => {
  Story.findById(req.params.id)
  .populate("parts")
  .then(story => {
    res.send(story.parts);
  });
});

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

      User.findById(req.body.authorId)
      .then(user => {

        user.parts = user.parts.concat([part._id])
        story.content = story.content.concat([part._id]);
         if (story.contributors.indexOf(user._id) === -1)
        {story.contributors = story.contributors.concat([user._id])}

        //will push the UserId into the contributors array, as long as the user is not 
        //already in it
        //Caution! If the Original Author adds a Part they will appear double
        //inside original author and in contributors

        story.save();
        part.save();
        user.save();
     
        res.send(story); //maybe it is necessary to send the part here
        //will see later

      })

      
    }

    if (req.body.name) {

      //No need to push characters into user array
      //does not make sense to store them there
      //if necessary, will get the charaters of a user through search

      const character = new Character({
        story: story._id,
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        name: req.body.name,
        description: req.body.description,
        age: req.body.age,
        gender: req.body.gender
        //TODO later maybe a picture as well
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
  //TODO Should be called when the story is updated -> toggle is_being_updated
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
  //TODO need later to check if the Booleans etc. are given or not

  //TOTEST if the story Id gets updated to the User Array
  new Story({
    title,
    tagline,
    setting,
    genre,
    originalAuthorId,
    originalAuthorName,
  })
    .save()
    .then(story => {
      
      User.findById(story.originalAuthorId)
      .then(user => {
        user.stories = user.stories.concat([stoy._id])
        user.save()
      })

      return story
    }).then(story => {
      res.send(story)
    })
});

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
