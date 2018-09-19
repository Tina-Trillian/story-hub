const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const storiesRoutes = require("./stories")
const partsRoutes = require("./parts")
const usersRoutes = require("./users")
const charactersRoutes = require("./characters")




const { userMiddleware, checkLoggedIn } = require('../../utils/middleware')

router.use(userMiddleware)

router.get('/', (req, res) => {
    res.send({ hello: true })
})

router.get('/protected', checkLoggedIn, (req, res) => {
    console.log('USER', req.user)
    res.send({ success: true })
})

router.use('/auth', authRoutes)

router.use("/stories", storiesRoutes)

router.use("/parts", partsRoutes)

router.use("/users", usersRoutes)

router.use("/characters", charactersRoutes)


router.use((req, res) => {
    res.status(404).send({ error: 'not-found' })
})

module.exports = router
