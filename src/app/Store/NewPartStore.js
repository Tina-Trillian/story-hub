import { observable, action, toJS } from "mobx";
import jwtDecode from "jwt-decode";
import api from "../js/utils/api";

import UserStore from "./UserStore";
import NewStoryStore from "./NewStoryStore";

class NewPartStore {
  @observable
  content = "";

  @observable
  error = "";

  @observable
  authorId = UserStore._id;

  @observable
  authorName = UserStore.username;

  @observable
  story = "";

  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  @action
  pushButton() {
    if (!this.content) {
      this.error = "Please write something";
      return;
    } else {
      this.story = NewStoryStore.story._id;
      
      const part = {
          content : this.content,
          authorId : this.authorId,
          authorName : this.authorName,
          story : this.story,
      }

      api.post(`api/stories/${part.story}/add`)
      .then(result => console.log(result))
    }
  }
}

export default new NewPartStore();
