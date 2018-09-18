const express = require('express')
const router = express.Router()

const Story = require('../../models/Story')


const { userMiddleware, checkLoggedIn } = require('../../utils/middleware')

router.use(userMiddleware)
//need tp see later, what it does excactly!!!

router.get('/', (req, res) => {
    res.send({message: "Hello from the stories!"})
})

// router.get('/protected', checkLoggedIn, (req, res) => {
//     console.log('USER', req.user)
//     res.send({ success: true })
// })

router.get("/all", (req,res) => {

    //will get all stories that are in the database
    
    Story.find({}).then(stories => {
        res.send({stories})
    })
})

//Maybe later get a Route that searches all Stories by req.user
//and a Route that searches for all Parts by req.user

router.get("/:id", (req, res) => {

    //Will find a Story with the right Id and display it

    Story.findById(req.params.id)
    .then(story => {
        res.send(story)
    })
})

router.delete("/:id", (req, res) => {

    //will find the Story with the right Id in the URL and delete it

    Story.findByIdAndRemove(req.params.id)
    .then(deletedStory => {
        res.send({
            deleted: true,
            deletedStory
        })
    })
    
})

//might not need the edit route, as the story is "edited" through the parts and character creation
router.patch("/:id/edit", (req, res) => {
    res.send({message: `The story with the id: ${req.params.id} will be edited!`})
})

router.post("/new", (req, res) => {
    const {title, tagline, setting, genre, originalAuthorId, originalAuthorName} = req.body
    
    //Will create a new Story with the given parameters
    //need later to check if the Booleans etc. are given or not

    new Story({title, tagline, setting, genre, originalAuthorId, originalAuthorName})
    .save()
    .then(story => {
        res.send(story)
    })
})





router.use((req, res) => {
    res.status(404).send({ error: 'not-found' })
})

module.exports = router
