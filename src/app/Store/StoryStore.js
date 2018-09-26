import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"

import UserStore from "./UserStore"


class StoryStore {
  @observable
  stories = [];

  @observable
  story = {};

  
  @action 
  getStoryById = (id) => {
      api.get(`/api/stories/${id}`).then(data => {
        this.story = data
      })
  }

  @action
  toggleUpdate(statement) {
      api.patch(`/api/stories/${this.story._id}/toggle`,
      {is_being_updated: statement, last_updated_by: UserStore._id})
      .then(result => 
        this.getStoryById(result._id))
        .then(console.log(toJS(this.story)))
  }

  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  @action
  setStories = () => {
    api.get('/api/stories/all').then(data => {
        this.stories = data.stories
        
        const clean = this.stories.map(story => {
          let sum = 0;
          story.content.forEach(part => {
            console.log(part.content)
        })
    })
  })
  }
}

export default new StoryStore();
