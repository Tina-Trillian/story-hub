import { observable, action, toJS } from "mobx";
import jwtDecode from "jwt-decode";
import api from "../js/utils/api";

import UserStore from "./UserStore";
import StoryStore from "./StoryStore";


class NewCharStore {
  @observable
  name = "";

  @observable
  description = "";

  @observable
  age = "";

  @observable
  gender = "";

  @observable
  error = "";

  @observable
  authorId = "";

  @observable
  authorName = "";

  @observable
  story = "";

  @observable
  allFilled = true

  @action
  handleInputChange(key, newValue) {
    if (newValue < 0) newValue=0
    this[key] = newValue;
  }

  @action
  checkIfFilled() {
    
    if (!this.gender || !this.age || !this.name || !this.description)
    this.allFilled = false
    else {this.allFilled = true}
  }

  @action
  resetCharacter() {
    this.name = ""
    this.age = ""
    this.gender = ""
    this.description = ""
    this.story = ""
    this.authorId = ""
    this.authorName = ""
  }

  @action
  pushButton() {

    const char = {
      name: this.name,
      description: this.description,
      age: this.age,
      gender: this.gender,
      authorId: this.authorId,
      authorName: this.authorName,
      story: this.story,
    }

    this.resetCharacter()

    return new Promise((resolve, reject) => {
      console.log("Pushed");

        api
          .post(`/api/stories/${char.story}/add`, char)
          .then(result => 
            StoryStore.getStoryById(result._id))
          .then(story => 
            resolve(story))
          .catch(err => console.log(err))
    });
  }
}

export default new NewCharStore();
