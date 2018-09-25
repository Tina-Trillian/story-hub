import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { observer } from "mobx-react";
import { toJS } from "mobx";

import {Modal} from 'reactstrap';

import StoryStore from "../../../Store/StoryStore";
import UserStore from "../../../Store/UserStore";
import NewPart from "../NewPart"

class StoryContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

    toggle() {
      StoryStore.toggleUpdate();
        this.setState({
          modal: !this.state.modal
        });
      }
  render() {


    const story = StoryStore.story
    let list, image, genre, tags;
    if (story.content) {
      list = story.content.map((el, index) => {
      return (
        <React.Fragment key={`para_${index}`}>
      <p>{el.content}</p>
      {index < story.content.length-1 && <hr />}
      </React.Fragment>
      )
    })
      image = story.picture;
      genre = story.genre.map((el, index) => {
        return (<button className="btn my-3 mx-2 btn-genre" key={`gen_${index}`}>{el}</button>)
      })
      tags = story.tag.map((el, index) => {
        return (<button className="btn my-3 mx-2 btn-tag" key={`tag_${index}`}>{el}</button>)
      })
      }

    return (
      <div>
      <div className="story-container">
        <div className="header" style={{backgroundImage: "url("+image+")"}}>
        <div className="header-content"><h1>{story.title}</h1></div>
        </div>
        </div>
        <h3 className="tagline my-3"><i>{story.tagline}</i></h3>
        <div className="genre">
        {genre}{tags}
        </div>
        <div className="story-container">
        <div className="story-text py-3">
        {list}
        </div>
        </div>

         {!StoryStore.story.is_being_updated && <button className="btn btn-primary my-4" onClick={this.toggle}>Add a new part with modal</button>}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <NewPart toggle={this.toggle}/>
        </Modal>
        {StoryStore.story.is_being_updated &&
          StoryStore.story.last_updated_by !== UserStore._id ? <h3>Another User is writing something ...</h3> : ""}
 
      </div>
    );
  }
}

export default withRouter(observer(StoryContent));
