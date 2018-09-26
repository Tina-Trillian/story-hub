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
  }

  componentDidMount() {
    StoryStore.getStoryById(this.props.match.params.id);
    // const interval = setInterval(() => {
    //   console.log("Hello")
    //   StoryStore.getStoryById(this.props.match.params.id)
    // }, 1000)
  
  }

  render() {
    return (
      <div className="container-fluid mt-3">
      <div className="row">
      <div className="col-12 col-lg-3 last">
          <StoryInfo />
        </div>
      <div className="col-12 col-lg-9 text-center">
          <StoryContent />
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(observer(Details));
