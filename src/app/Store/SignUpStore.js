import { observable, action, toJS } from "mobx";
import api from "../js/utils/api"

import UserStore from '../Store/UserStore'


class SignUpStore {
  @observable
  email = "";

  @observable
  username = "";

  @observable
  password = "";

  @observable
  description = null;

  @observable
  picture = undefined;

  @observable
  error = "";

  @observable
  message = "";

  //handles all the input changes from the signup and signin forms
  @action
  handleInputChange(key, newValue) {
    this[key] = newValue;
  }

  //handles sign in and signup process - first argument will be "in" or "up"
  //as a Promise so that the redirect can be called in the component 
  //AFTER the token is send
  @action
  sign(type) {
    this.message = "Loading Picture, please have patience"
    //TODO may limit filesize later for profilePic
    return new Promise((resolve, reject) => {
      this.error = "";

      const pictureDeclaration = type === "up" && { picture: this.picture };

      api
        .post(
          `/api/auth/sign-${type}`,
          type === "in"
            ? { email: this.email, password: this.password }
            : {
                email: this.email,
                password: this.password,
                description: this.description || "I'm still thinking about a good description. :)",
                //TODO maybe there is a more elegant solution for that
                username: this.username
              },
          pictureDeclaration
        )
        .then(data => {
          //Receives the User Token and stores it in the local Storage
          localStorage.setItem("identity", data.token);
          UserStore.setUser();
          this.message = ""
          resolve(data)
        })
        .catch(err => {
          this.message = ""
          this.error = err.description;
        });
    });
  }
}

export default new SignUpStore();
