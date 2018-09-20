import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"

//might use this later - for now working with state

class StoryStore {
  @observable
  stories = [];


  @action
  setStories = () => {
      api.get("/api/stories/all")
      .then(stories => {
          this.stories.concat(stories.stories)
          

      })
  }
  
}

export default new StoryStore();
