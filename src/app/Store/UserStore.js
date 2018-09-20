import { observable, action, toJS } from 'mobx'
import jwtDecode from 'jwt-decode'

class UserStore {
    @observable
    _id = null

    @observable
    email = null

    @observable
    profilePicture = null

    @observable
    description = null

    @observable
    username = null

    @observable 
    stories = null

    @observable
    parts = null


    @action
    setUser = () => {

        //gets all User Data from the local Storage, which was send as a token
        //that's why it needs decoding

        const token = localStorage.getItem('identity')
        if (token) {
            const decoded = jwtDecode(token)
            delete decoded.iat

            this._id = decoded._id
            this.email = decoded.email
            this.profilePicture = decoded.profilePicture
            this.description = decoded.description
            this.username = decoded.username
            this.stories = decoded.stories
            this.parts = decoded.parts
        }
    }

    @action
    resetUser = () => {
        console.log("Log Out")
        this._id = null
        this.email = null
        this.profilePicture = null
        this.description = null
        this.username = null
        this.stories = null
        this.parts = null
    }
}

export default new UserStore()
