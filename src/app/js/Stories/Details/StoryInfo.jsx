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
          <button className="btn">{el.username}</button>
        </Link>
      );
    });
    const characters = story.characters.map((el, index) => {
      return <CharacterCard key={`char_${index}`} character={el} />;
    });
    const originalAuthor = (
      <Link to={`/profile/${story.originalAuthorId._id}`}>
        <button className="btn my-3">{story.originalAuthorId.username}</button>
      </Link>
    );

    if (!contributors || !characters || !originalAuthor) return "";

    return (
      <div className="info-container">
        <div>
          <h4>Story was started by</h4>
          {originalAuthor}
        </div>
        {contributors.length > 0 && (
          <React.Fragment>
            <h4>Contributors</h4>
            <div className="contributors my-3">{contributors}</div>
          </React.Fragment>
        )}
        {characters.length > 0 && (
          <React.Fragment>
            <h4>Characters</h4>
            <div className="characters">{characters}</div>
          </React.Fragment>
        )}
        {UserStore._id && (
          <button className="btn my-4" onClick={this.toggle}>
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
