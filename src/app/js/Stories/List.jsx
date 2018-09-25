import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {observer} from "mobx-react"
import { toJS} from "mobx"

import api from "../utils/api"
import StoryStore from "../../Store/StoryStore";

import StoryCard from "./StoryCard"



class List extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

    StoryStore.setStories()
 
  }

  render() {

    const list = StoryStore.stories.map((el,index) => {
        return  <StoryCard key={`story_${index}`} story={el} />
    })

    return (
      <div>
        <h1>Here are all the stories!</h1>
        <Link to="/stories/new"><button>Add a new Story here</button></Link>
        <div className="stories-container">
        {list}
        </div>
      </div>
    );
  }
}

export default observer(List);
