import { observable, action, toJS } from "mobx";
import api from "../js/utils/api";

import UserStore from "./UserStore";

class NewStoryStore {

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
  is_being_updated = false;

  @observable
  is_public = true;

  @observable
  is_moderated = false;

  @observable
  is_finished = false;

  @observable
  temp = "";

  @observable
  loading = false;

  @observable
  error = "";

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
  }

  //TODO creating new Story
  @action
  createNewStory() {
   
    return new Promise((resolve, reject) => {
    
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
    const pictureDeclaration = { picture: this.picture };
    if(this.picture) {this.loading = true}

    api
      .post(
          `/api/stories/new`,
          story,
          pictureDeclaration
        )
        .then(data => {
          this.loading = false
          resolve(data)
        })
        .catch(err => {
          this.message = ""
          this.error = err.description;
        });
    });

  //TODO Maybe return a Promise here as well, to get rid of error
  }

  @action
  resetNewStory() {
   
  this.title = "";
  this.tagline = "";
  this.originalAuthorId = "";
  this.originalAuthorName = "";
  this.tag = [];
  this.allGenre = [];
  this.genre = [];
  this.genreList = {};
  this.picture = undefined;
  this.is_public = true;
  this.is_moderated = false;
  this.temp = "";
  this.loading = false;
  this.error = "";
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
