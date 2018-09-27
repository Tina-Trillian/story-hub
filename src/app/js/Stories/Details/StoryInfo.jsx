import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import { toJS } from "mobx";

import { Modal } from "reactstrap";

import StoryStore from "../../../Store/StoryStore";
import NewCharacter from "../NewCharacter";
import CharacterCard from "./CharacterCard";
import UserStore from "../../../Store/UserStore";

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
    const story = StoryStore.story;

   

    const contributors = story.contributors.map((el, index) => {
      return (
        <Link to={`/profile/${el._id}`} key={`cont_${index}`}>
          <button className="button button-dark m-1">{el.username}</button>
        </Link>
      );
    });
    const characters = story.characters.map((el, index) => {
      return <React.Fragment key={`char_${index}`}>
        <CharacterCard character={el} />
        <hr/>
        </React.Fragment>
    });
    const originalAuthor = (
      <Link to={`/profile/${story.originalAuthorId._id}`}>
        <button className="button my-3 mb-5">{story.originalAuthorId.username}</button>
      </Link>
    );

    if (!contributors || !characters || !originalAuthor) return "";

    

    return (
      <div className="info-container">
        <div className="info-bar-top px-3 py-5">
          <h3 className="mt-2">Story was started by</h3>
          {originalAuthor}
        {contributors.length > 0 && (
          <React.Fragment>
            <h3>Contributors</h3>
            <div className="contributors my-3">{contributors}</div>
          </React.Fragment>
        )}
        </div>
        {characters.length > 0 && (
          <React.Fragment>
            <h3 className="pt-5">Characters</h3>
            <div className="characters">
            <hr/>{characters}</div>
          </React.Fragment>
        )}
        {UserStore._id && (
          <button className="button button-darker my-4" onClick={this.toggle}>
            Add a new character
          </button>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <NewCharacter toggle={this.toggle} />
        </Modal>
      </div>
    );
  }
}

export default withRouter(observer(Details));
