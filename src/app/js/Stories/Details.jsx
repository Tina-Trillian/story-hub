import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { observer } from "mobx-react";
import { toJS } from "mobx";

import StoryStore from "../../Store/StoryStore";

class Details extends React.Component {

    constructor(props) {
        super(props);
      }
    
      componentDidMount() {

        StoryStore.getStoryById(this.props.match.params.id)
        
      }

  render() {

    const story = StoryStore.story
    let list, contributors;
    if (story.content) {
      list = story.content.map((el, index) => {
      return <p key={`para_${index}`}>{el.content}</p>
    })
      contributors = story.contributors.map((el, index) => {
        return <li key={`cont_${index}`}><Link to={`/profile/${el._id}`}>{el.username}</Link></li>
      })
      }
    
    

    return (
      <div>
        <h1>Details Page</h1>
        <h2>{story.title}</h2>
        <img src={story.picture} width="200px"></img>
        <h3><i>{story.tagline}</i></h3>
        {list}
        <ul>{contributors}</ul>
      </div>
    );
  }
}

export default withRouter(observer(Details));
