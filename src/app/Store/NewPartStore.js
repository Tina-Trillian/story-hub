import { observable, action, toJS } from "mobx";
import jwtDecode from "jwt-decode";
import api from "../js/utils/api";

import UserStore from "./UserStore";
import StoryStore from "./StoryStore";

class NewPartStore {
  @observable
  content = "";

  @observable
  authorId = "";

  @observable
  authorName = "";

  @observable
  story = "";

  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  @action
  resetPart() {
    this.content = "";
    this.authorId = "";
    this.authorName = "";
    this.story = "";
  }

  @action
  pushButton() {
    this.story = StoryStore.story._id;
    this.authorId = UserStore._id;
    this.authorName = UserStore.username;
    console.log("THIS",toJS(this));

      const part = {
        content: this.content,
        authorId: this.authorId,
        authorName: this.authorName,
        story: this.story
      };

      this.resetPart();

      api
        .post(`/api/stories/${part.story}/add`, part)
        .then(
          result => {
            StoryStore.getStoryById(result._id)
          })
        .catch(err => console.log(err));
  }
}

export default new NewPartStore();
