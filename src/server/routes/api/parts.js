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
  res.send({ message: "Hello from the parts!" });
});

// router.get('/protected', checkLoggedIn, (req, res) => {
//     console.log('USER', req.user)
//     res.send({ success: true })
// })



router.get("/all", (req, res) => {
  //will get all parts that are in the database

  Part.find({}).then(parts => {
    res.send({ parts });
  });
});

router.get("/:id", (req, res) => {
  //Will find a Part with the right Id and display it

  Part.findById(req.params.id).then(part => {
    res.send(part);
  });
});

//Finds the Part for the id and deletes the part AND all traces
//in the user and story objects
router.delete("/:id", checkLoggedIn, (req, res) => {
    Part.findByIdAndRemove(req.params.id)
    .then(part => {
      
      User.findById(part.authorId)
      .then(user => {
        
      //finds the User and deletes the partID out of the array
      const index = user.parts.indexOf(part._id)
      user.parts.splice(index,1)

      user.save()

      })

      return part
    }).then(part => {

      Story.findById(part.story)
      .then(story => {

      //finds the story and deleted the partsID out of the array
      const index = story.content.indexOf(part._id)
      story.content.splice(index,1)

      story.save()
      })
      
      return part
    }).then(part => {
      res.send({
        deleted: true,
        deletedPart: part})
    })
  });


//might not need the edit route
router.patch("/:id/edit", checkLoggedIn, (req, res) => {
  res.send({
    message: `The part with the id: ${req.params.id} will be edited!`
  });
});

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});



module.exports = router;
