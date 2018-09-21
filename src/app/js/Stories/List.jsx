import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {observer} from "mobx-react"
import { toJS} from "mobx"

import api from "../utils/api"
import StoryStore from "../../Store/StoryStore";



class List extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

    StoryStore.setStories()
 
  }

  render() {

    const list = StoryStore.stories.map((el,index) => {
        return (
        <div key={`story_${index}`}>
        <Link to={`/stories/${el._id}`}>
            <h2>{el.title}</h2> </Link>
            <h3>{el.tagline}</h3>
            </div>)
    })

    return (
      <div>
        <h1>Here are all the stories!</h1>
        <Link to="/stories/new"><button>Add a new Story here</button></Link>
        {list}
      </div>
    );
  }
}

export default observer(List);
