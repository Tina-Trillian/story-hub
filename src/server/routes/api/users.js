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
  res.send({ message: "Hello from the users!" });
});

// router.get('/protected', checkLoggedIn, (req, res) => {
//     console.log('USER', req.user)
//     res.send({ success: true })
// })



router.get("/all", (req, res) => {
  //will get all users that are in the database
  User.find({}).then(users => {
    res.send({ users });
  });
});

//Will get the user with the right id - later needed for profile
//view of other users!
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
    .populate("stories")
    .populate({
      path: 'parts',
      populate: { path: 'story' }
    })
    .then(user => {
        res.send({
          username: user.username,
          profilePicture: user.profilePicture,
          description: user.description,
          stories: user.stories,
          parts: user.parts,
        })
    })
})

//TO TEST
//Get all the Characters the User has created
router.get("/:id/characters", (req, res) => {
    
    Character.find({authorId: req.params.id})
    .then(characters => {
        res.send(characters)
    })
})

//TO TEST
//Get all the Stories a User has created
router.get("/:id/stories", (req, res) => {
    Story.find({originalAuthorId: req.params.id})
    .then(userStories => {
      res.send(userStories)
    })
  })

//TO TEST
//Get all the Parts a User has written
router.get("/:id/parts", (req, res) => {
    
    User.findById(req.params.id)
    .populate("parts")
    .then(user => {
        res.send({
            parts: user.parts
        })
    })
})

//might not need the edit route
router.patch("/:id/edit", (req, res) => {
  res.send({
    message: `The User with the id: ${req.params.id} will be edited!`
  });
});

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});



module.exports = router;
