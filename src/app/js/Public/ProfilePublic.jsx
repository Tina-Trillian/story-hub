import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { withRouter } from "react-router";

import ProfileStore from "../../Store/ProfileStore";

@observer
class ProfilePublic extends Component {
  componentDidMount() {
    ProfileStore.getUser(this.props.match.params.id);
  }

  render() {
    const stories = ProfileStore.stories.map((el, index) => {
      return (
        <h5 key={`stor_${index}`}>
          <Link
          className="link"
          to={`/stories/${el._id}`}>{el.title}</Link>
        </h5>
      );
    });

    const parts = ProfileStore.parts.map((el, index) => {
      return (
        <h5 key={`part_${index}`}>
          <Link 
          className="link"
          to={`/stories/${el.story._id}`}>{el.story.title}</Link>
        </h5>
      );
    });

    return (
      <div className="profile-container">
        <div className="row mx-0">
          <div className="col-lg-4 col-12 profile-info py-5">
          <img src={ProfileStore.profilePicture} />
            <br />
            <h1>{ProfileStore.username}</h1>
            <hr />
            {ProfileStore.description}
            <br />
          </div>
          <div className="col-lg-4 col-sm-6 col-12 profile-stories py-5 px-3 profile-primary">
          <h2>Stories I created</h2>
          {stories}
          </div>
          <div className="col-lg-4 col-sm-6 col-12 profile-stories py-5 px-3 profile-darker">
          <h2>Stories I contributed to</h2>
          {parts}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePublic);
