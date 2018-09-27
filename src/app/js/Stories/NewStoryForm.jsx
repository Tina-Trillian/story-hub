import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router"

import { observer } from "mobx-react";
import { toJS } from "mobx";
import NewStoryStore from "../../Store/NewStoryStore";
import UserStore from "../../Store/UserStore";

import gif from "../../assets/Eclipse-1s-200px (1).gif"



class NewStoryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NewStoryStore.resetNewStory();
    NewStoryStore.getGenre();
    NewStoryStore.setAuthor(UserStore.username, UserStore._id);
  }

  render() {

    UserStore.setUser();
    if (!UserStore._id) return <Redirect to="/auth/sign-in" /> // this is actually the protection
   


    const tagList = NewStoryStore.tag.map((el, index) => {
      return <button className="btn-tag" key={`tag_${index}`}>{el}</button>;
    });

    let genreList;
    //to prevent the uncontrolled/controlled error: when the list is generated the object.key pair
    //is not yet finished! So we wait untill all the pairs are set up with "false" and THEN
    //genrerate the list - that way the checkbox starts its life as a "controlled" input from the
    //beginning
    if (
      NewStoryStore.genreList &&
      NewStoryStore.allGenre.length ===
        Object.keys(NewStoryStore.genreList).length
    )
      genreList = NewStoryStore.allGenre.map((el, index) => {
        return (
          <span key={`genr_${index}`} className="p-2">
            <input
              name={el}
              onChange={evt =>
                NewStoryStore.handleCheckboxChange(el, evt.target.checked)
              }
              type="checkbox"
              className="mr-1"
              checked={NewStoryStore.genreList[el]}
            />
            <label >{el}</label>
          </span>
        );
      });

    return (
      <div>
      <div className="form-container mx-auto mt-md-5 pt-5">
        <h1>Start a new story</h1>
        <br />
        <h2 className="mb-4">Title and Tagline</h2>
        <input
          name="title"
          onChange={evt =>
            NewStoryStore.handleInputChange("title", evt.target.value)
          }
          value={NewStoryStore.title}
          className="input"
          type="text"
          placeholder="Title"
          required={true}
        />
        <br />
        <br />
        <input
          name="tagline"
          className="input"
          type="text"
          value={NewStoryStore.tagline}
          placeholder="Tagline"
          onChange={evt =>
            NewStoryStore.handleInputChange("tagline", evt.target.value)
          }
          required={true}
        />
        {/* <input
          name="public"
          onChange={evt =>
            NewStoryStore.handleInputChange("is_public", evt.target.checked)
          }
          type="checkbox"
          checked={NewStoryStore.is_public}
        />
        <label>Make your story public</label>
        <br />
        <br />
        <input
          name="is_moderated"
          onChange={evt =>
            NewStoryStore.handleInputChange("is_moderated", evt.target.checked)
          }
          type="checkbox"
          checked={NewStoryStore.is_moderated}
        />
        <label>Check if you want to moderate your story</label> */}
        <br />
        <br />
        <h2 className="mb-4" >Tags</h2>
        <input
          name="tag"
          type="text"
          className="input"
          value={NewStoryStore.temp}
          onChange={evt =>
            NewStoryStore.handleInputChange("temp", evt.target.value)
          }
          placeholder="Type a tag here"
        />
        <button className="button ml-2" onClick={() => NewStoryStore.addTag()}>Add Tag</button>
        {/* TODO Should add the tag to the view once the button is pushed */}
        <div className="tag-container">{tagList}</div>
       <h2 className="mb-4">Genre</h2>
        <div className="tag-container">
        {genreList}
        </div>
        <h2>Picture</h2>
        <p>
          Don't worry, if you don't have
          one, we will choose one for you
        </p>
        <input
          type="file"
          className="input"
          onChange={evt =>
            NewStoryStore.handleInputChange("picture", evt.target.files[0])
          }
          placeholder="Set the mood ..."
        />
        <br />
        <br />
        {!NewStoryStore.title || !NewStoryStore.tagline ? <p>Please add a title and a tagline!</p> : ""}
        {!NewStoryStore.loading && NewStoryStore.title && NewStoryStore.tagline ? <button
        className="button"
        onClick={() => NewStoryStore.createNewStory()
        .then(result => {this.props.history.push(`/stories/${result._id}`)})}>
          Create your story and write the first Part!
        </button> : ""}
        {NewStoryStore.loading && <img src={gif} />}
        <br />
        <br />
        <p>{NewStoryStore.error}</p>
      </div>
      </div>    
    );
  }
}

export default withRouter(observer(NewStoryForm));
