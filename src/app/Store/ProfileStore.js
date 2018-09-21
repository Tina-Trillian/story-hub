import { observable, action, toJS } from 'mobx'
import jwtDecode from 'jwt-decode'
import api from "../js/utils/api"

class ProfileStore {
   
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
    getUser = (id) => {
            api.get(`/api/users/${id}`)
            .then(result => {
    
                this.profilePicture = result.profilePicture
            
    
                this.description = result.description
            
    
                this.username = result.username
            
     
                this.stories = result.stories
            
    
                this.parts = result.parts
            })
    }


}

export default new ProfileStore()
