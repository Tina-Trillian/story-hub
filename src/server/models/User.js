const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default:
            'https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1f8a140ac20927deb386d1c9187433d6&auto=format&fit=crop&w=376&q=80',
    },
    description: {
        type: String,
        default: "I'm still thinking about a good description :)"
    },
    stories: {
        type: [Schema.Types.ObjectId],
        ref: "Story",
        default: [],
    }, //All the stories the User created/started
    parts: {
       type: [Schema.Types.ObjectId],
       ref: "Part",
       default: []
    } //All parts the User contributed to stories
    //might inlcude the StoryIds here instead of Part, will see later
})

module.exports = mongoose.model('User', userSchema)
