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
