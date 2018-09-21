import { observable, action, toJS } from "mobx";
import api from "../js/utils/api";

import UserStore from "./UserStore";

class NewStoryStore {
  @observable
  story = {};

  @observable
  title = "";

  @observable
  tagline = "";

  @observable
  originalAuthorId = "";

  @observable
  originalAuthorName = "";

  @observable
  tag = [];

  @observable
  allGenre = [];

  @observable
  genre = [];

  @observable
  genreList = {};

  @observable
  picture = undefined;

  @observable
  is_being_updated = true;

  @observable
  is_public = true;

  @observable
  is_moderated = false;

  @observable
  is_finished = false;

  @observable
  temp = "";

  @observable
  message = "";

  @observable
  error = "";

  @observable
  storySent = false;

  @action
  setAuthor(name, id) {
    this.originalAuthorName = name;
    this.originalAuthorId = id;

  }

  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  @action
  handleCheckboxChange(key, newValue) {
    this.genreList[key] = newValue;
  }

  @action
  addTag() {
    if (this.temp.length > 0) {
    this.tag.push(this.temp);
    this.temp = "";
    }
    console.log(toJS(this.tag))
  }

  //TODO creating new Story
  @action
  createNewStory() {
    if(this.message === "") {

    return new Promise((resolve, reject) => {

    
    if(!this.title || !this.tagline) {
        this.error = "Please add a title and tagline!"
        reject();
      }
    else {
    this.allGenre.forEach(el => {
      if (this.genreList[el] === true) this.genre.push(el);
    });
    
    const story = {
      title : this.title,
      tagline : this.tagline,
      originalAuthorId : this.originalAuthorId,
      originalAuthorName : this.originalAuthorName,
      tag : toJS(this.tag),
      genre : toJS(this.genre),
      is_being_updated : this.is_being_updated,
      is_finished : this.is_finished,
      is_public : this.is_public,
      is_moderated: this.is_moderated,
    }
    this.message = "Loading Picture, please have patience"
    const pictureDeclaration = { picture: this.picture };

    api
      .post(
          `/api/stories/new`,
          story,
          pictureDeclaration
        )
        .then(data => {
          this.message = ""
          this.storySent = true
          this.story = data
          resolve(data)
        })
        .catch(err => {
          this.message = ""
          this.error = err.description;
        });
    }});
  }
  else {this.message = "Please wait till the picture is loaded";
  return;}

  //TODO Maybe return a Promise here as well, to get rid of error
  }

      

  @action
  getGenre() {
    api.get("/api/stories/all-genre").then(result => {
      this.allGenre = result;
      this.allGenre.forEach(el => {
        this.genreList[el] = false;
      });
    });
  }
}

export default new NewStoryStore();
