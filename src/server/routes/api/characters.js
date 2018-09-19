const express = require("express");
const router = express.Router();

const Story = require("../../models/Story");
const Part = require("../../models/Part");
const Character = require("../../models/Character");

const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);
//need to see later, what it does excactly!!!

router.get("/", (req, res) => {
  res.send({ message: "Hello from the characters!" });
});

// router.get('/protected', checkLoggedIn, (req, res) => {
//     console.log('USER', req.user)
//     res.send({ success: true })
// })


router.get("/all", (req, res) => {
  //will get all characters that are in the database

  Character.find({}).then(characters => {
    res.send({ characters });
  });
});

router.get("/:id", (req, res) => {
  //Will find a Character with the right Id and display it

  Character.findById(req.params.id).then(character => {
    res.send(character);
  });
});

router.delete("/:id", (req, res) => {
 //will find the Character with the right Id in the URL and delete it
 
  Character.findByIdAndRemove(req.params.id).then(deletedCharacter => {

    Story.findById(deletedCharacter.story)
    .then(story => {
      //finds the story and deleted the characterID out of the array
      const index = story.characters.indexOf(deletedCharacter._id)
      story.characters.splice(index,1)

      story.save()

      res.send({
        deleted: true,
        deletedCharacter
      });
    })
  });
});

//might not need the edit route
router.patch("/:id/edit", (req, res) => {
  res.send({
    message: `The part with the id: ${req.params.id} will be edited!`
  });
});

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});



module.exports = router;
