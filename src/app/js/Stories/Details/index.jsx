import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import { toJS } from "mobx";

import StoryStore from "../../../Store/StoryStore";
import UserStore from "../../../Store/UserStore";
import NewCharacter from "../NewCharacter";
import NewPart from "../NewPart";
import StoryContent from "./StoryContent";
import StoryInfo from "./StoryInfo";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true
    }

    this._toggleSidebar = this._toggleSidebar.bind(this)
  }

  componentDidMount() {
    StoryStore.getStoryById(this.props.match.params.id);
    const interval = setInterval(() => {
      StoryStore.getStoryById(this.props.match.params.id)
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  _toggleSidebar() {
    this.setState({
      toggle: !this.toggle
    })
  }

  render() {
    return (
      <div>
      <div className="row mx-0">
      {/* <button
      onClick={}
      className="button toggle-button">See more</button> */}
      {this.state.toggle && <div className="col-12 col-lg-3 last test px-0">
          <StoryInfo />
        </div>}
      <div className="col-12 col-lg-9 text-center test">
          <StoryContent />
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(observer(Details));
