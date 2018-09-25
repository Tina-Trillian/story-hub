import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"



class StoryStore {
  @observable
  stories = [];

  @observable
  story = {};

  @observable
  adding_character = false;

  @observable
  adding_part = false;


  @action 
  getStoryById = (id) => {
      api.get(`/api/stories/${id}`).then(data => {
        this.story = data
      })
  }

  @action
  toggleUpdate() {
      api.patch(`/api/stories/${this.story._id}/toggle`,
      {is_being_updated: !this.story.is_being_updated})
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
    })
}
  
}

export default new StoryStore();
