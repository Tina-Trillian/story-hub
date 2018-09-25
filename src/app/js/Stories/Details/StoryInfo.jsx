import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { observer } from "mobx-react";
import { toJS } from "mobx";

import {Modal} from 'reactstrap';

import StoryStore from "../../../Store/StoryStore";
import NewCharacter from "../NewCharacter";
import CharacterCard from "./CharacterCard";



class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

  render() {


    const story = StoryStore.story
    let contributors, characters, originalAuthor;
    if (story.content) {
      contributors = story.contributors.map((el, index) => {
        return <Link to={`/profile/${el._id}`} key={`cont_${index}`}><button className="btn">{el.username}</button></Link>
      })
      characters = story.characters.map((el, index) => {
        return <CharacterCard key={`char_${index}`} character={el} />
      })
      originalAuthor = <Link to={`/profile/${story.originalAuthorId._id}`}><button className="btn my-3">{story.originalAuthorId.username}</button></Link>
      }

      console.log(toJS(story))

    return (
      <div className="info-container">
      <div>
        <h4>Story was started by</h4>
        {originalAuthor}
      </div>
        <h4>Contributors</h4>
        <div className="contributors my-3">
        {contributors}
        </div>
        <h4>Characters</h4>
        <div className="characters">
        {characters}
        </div>
        <button className="btn my-4" onClick={this.toggle}>Add a new character</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <NewCharacter toggle={this.toggle}/>
        </Modal>
      </div>
    );
  }
}

export default withRouter(observer(Details));
