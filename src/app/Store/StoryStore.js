import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"

import UserStore from "./UserStore"


class StoryStore {
  @observable
  stories = [];

  @observable
  story = {
    title : "",
    originalAuthorId : "",
    originalAuthorName: "",
    contributors: [],
    tagline: "",
    content: [],
    tag: [],
    genre: [],
    picture: "",
    characters: [],
    is_being_updated: false,
    last_updated_by: "",
    is_finished: false,
    is_public: true,
    is_moderated: false
  };

  @observable 
  latest_new = []

  @observable
  latest_updated = []

  
  @action 
  getStoryById = (id) => {
      api.get(`/api/stories/${id}`).then(data => {
        this.story = data
      })
  }

  @action
  getHomeStories() {
    api.get("api/stories/three-latest")
    .then(new_stories => {
      this.latest_new = new_stories.stories

      return api.get("api/stories/three-updated")
    })
    .then(updated_stories => {
      this.latest_updated = updated_stories.stories
    })
  }

  @action
  toggleUpdate(statement) {
      api.patch(`/api/stories/${this.story._id}/toggle`,
      {is_being_updated: statement, last_updated_by: UserStore._id})
      .then(result => 
        this.getStoryById(result._id))
        // .then(console.log(toJS(this.story)))
  }

  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  @action
  setStories = () => {
    api.get('/api/stories/all').then(data => {
        this.stories = data.stories
        
        this.stories.map(story => {
          let allwords = ""
          story.content.forEach(part => {
            allwords += " " + part.content
        })
        story.allWords = allwords
        let arr = story.allWords.split(" ").filter(el => el.length > 0)
        story.length = arr.length
    })
  })
  }
}

export default new StoryStore();
