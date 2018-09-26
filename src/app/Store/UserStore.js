import { observable, action, toJS } from 'mobx'
import jwtDecode from 'jwt-decode'

import api from "../js/utils/api";

class UserStore {
    @observable
    _id = ""

    @observable
    email = ""

    @observable
    profilePicture = ""

    @observable
    description = ""

    @observable
    username = ""

    @observable 
    stories = []

    @observable
    parts = []


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

            api.get(`/api/users/${decoded._id}/stories`)
            .then(stories => {
                this.stories = stories

                return api.get(`/api/users/${decoded._id}/parts`)
            }).then(parts => {
                this.parts = parts
            }).then(result => console.log("User Set"))
        
        }

        //get the stories and parts seperatlely because it is not updated in the token!
        //so we do a different api.call for them
    }

    @action
    resetUser = () => {
        console.log("Log Out")
        this._id = ""
        this.email = ""
        this.profilePicture = ""
        this.description = ""
        this.username = ""
        this.stories = []
        this.parts = []
    }
}

export default new UserStore()
