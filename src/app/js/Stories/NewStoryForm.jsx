import React from "react";
import { Link, withRouter } from "react-router-dom";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import NewStoryStore from "../../Store/NewStoryStore";
import UserStore from "../../Store/UserStore";



class NewStoryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NewStoryStore.resetNewStory();
    NewStoryStore.getGenre();
    UserStore.setUser();
    NewStoryStore.setAuthor(UserStore.username, UserStore._id);
  }

  render() {



    const tagList = NewStoryStore.tag.map((el, index) => {
      return <p key={`tag_${index}`}>{el}</p>;
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
          <span key={`genr_${index}`}>
            <input
              name={el}
              onChange={evt =>
                NewStoryStore.handleCheckboxChange(el, evt.target.checked)
              }
              type="checkbox"
              checked={NewStoryStore.genreList[el]}
            />
            <label>{el}</label>
          </span>
        );
      });

    return (
      <div className="container">
        <h1>Add a New Story</h1>
        <br />
        <br />
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
        <br />
        <br />
        <input
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
        <label>Check if you want to moderate your story</label>
        <br />
        <br />
        <input
          name="tag"
          type="text"
          value={NewStoryStore.temp}
          onChange={evt =>
            NewStoryStore.handleInputChange("temp", evt.target.value)
          }
          placeholder="Type a tag here"
        />
        <button onClick={() => NewStoryStore.addTag()}>Add Tag</button>
        {/* TODO Should add the tag to the view once the button is pushed */}
        <div className="tag-container">{tagList}</div>
        Select your genres:
        <br />
        <br />
        {genreList}
        <br />
        <br />
        <p>
          Add a picture that fits your story - don't worry, if you don't have
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
        {!NewStoryStore.loading && NewStoryStore.title && NewStoryStore.tagline ? <button onClick={() => NewStoryStore.createNewStory()
        .then(result => {this.props.history.push(`/stories/${result._id}`)})}>
          Create your story and write the first Part!
        </button> : ""}
        {NewStoryStore.loading && <p>Loading picture, have patience</p>}
        <br />
        <br />
        <p>{NewStoryStore.error}</p>
      </div>
    );
  }
}

export default withRouter(observer(NewStoryForm));
