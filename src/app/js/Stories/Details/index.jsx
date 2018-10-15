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
    //Toggle sidebar later
    // this._toggleSidebar = this._toggleSidebar.bind(this)
  }

  componentDidMount() {
    StoryStore.getStoryById(this.props.match.params.id);
    this.interval = setInterval(() => {
      StoryStore.getStoryById(this.props.match.params.id)
    }, 2000)
    //sets and interval to refresh the information that is gotten from the
    //backend with the api call
    //so changes are shown immidiatley and when another User is writing it 
    //will be displayed
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    //clears intervall when the Details side is left
  }


  //toggling sidebar for later
  // _toggleSidebar() {
  //   this.setState({
  //     toggle: !this.toggle
  //   })
  // }

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
        {/* Story content moves to the top across the whole page when
        the screen gets smaller */}
      <div className="col-12 col-lg-9 text-center test">
          <StoryContent />
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(observer(Details));
