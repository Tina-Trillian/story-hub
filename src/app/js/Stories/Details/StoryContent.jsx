import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import { toJS } from "mobx";

import { Modal } from "reactstrap";

import StoryStore from "../../../Store/StoryStore";
import UserStore from "../../../Store/UserStore";
import NewPart from "../NewPart";
import gif from "../../../assets/Eclipse-1s-200px (1).gif"

class StoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(statement) {
    StoryStore.toggleUpdate(statement);
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    if (
      StoryStore.story.is_being_updated &&
      StoryStore.story.last_updated_by === UserStore._id &&
      !this.state.modal
    ) {
      
      StoryStore.toggleUpdate(false);
    }

    const story = StoryStore.story;

    const list = story.content.map((el, index) => {
      return (
        <React.Fragment key={`para_${index}`}>
          <p>{el.content}</p>
          {index < story.content.length - 1 && <hr />}
        </React.Fragment>
      );
    });
    const image = story.picture;
    const genre = story.genre.map((el, index) => {
      return (
        <Link to={`/stories/all/${el}`} key={`gen_${index}`}>
          {" "}
          <button className="button button-dark my-3 mx-2">{el}</button>
        </Link>
      );
    });
    const tags = story.tag.map((el, index) => {
      return (
        <Link to={"/stories/all"} key={`tag_${index}`}>
          <button className="btn my-3 mx-2 btn-tag">{el}</button>
        </Link>
      );
    });

    if (!tags || !genre || !image || !list) return <img src={gif} />;
    //TODO maybe later a loading spinner

    return (
      <div>
        <div className="story-container pt-5">
          {/* <div
            className="header"
            style={{ backgroundImage: "url(" + image + ")" }}
          > */}
            <div className="header-content">
              <h1>{story.title}</h1>
              <hr/>
              <h3 className="tagline my-3">
                <i>{story.tagline}</i>
              </h3>
            {/* </div> */}
          </div>
        </div>

        <div className="genre">
          {genre}
          {tags}
        </div>

        {list.length > 0 && (
          <div className="story-container">
            <div className="story-text py-3">
            <hr/>
            {list}
            <hr/></div>
          </div>
        )}
        {(!StoryStore.story.is_being_updated && UserStore._id) ||
        (StoryStore.story.is_being_updated &&
          UserStore._id === StoryStore.story.last_updated_by) ? (
          <button
            className="button button-dark my-4"
            onClick={() => this.toggle(true)}
          >
            Add a new part to to story
          </button>
        ) : ""}
        {!UserStore._id &&  <h4 className="mt-4">
            Want to contribute? Why not <Link className="link" to="/auth/sign-up">sign-up?</Link>
          </h4>}
        {/* Failsafe if the toggle/updating is not working */}
        {/* {StoryStore.story.is_being_updated &&
        UserStore._id === StoryStore.story.last_updated_by ? (
          <p>
            Please finish writing the part or close the window with the
            NeverMind-Button that other users can contribute too!
          </p>
        ) : (
          ""
        )} */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <NewPart toggle={this.toggle} />
        </Modal>
        {StoryStore.story.is_being_updated &&
        StoryStore.story.last_updated_by !== UserStore._id ? (
          <h3 className="primary mt-3">Another User is writing something ...</h3>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(observer(StoryContent));
