import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"

//might use this later - for now working with state

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
  setStories = () => {
    api.get('/api/stories/all').then(data => {

        this.stories = data.stories
    })
}
  
}

export default new StoryStore();
