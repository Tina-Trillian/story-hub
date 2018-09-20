import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {observer} from "mobx-react"
import { toJS} from "mobx"

import api from "../utils/api"
import StoryStore from "../../Store/StoryStore";



class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
        stories : []
    }
  }

  componentDidMount() {

    StoryStore.setStories()
        // api.get("/api/stories/all")
        // .then(({stories}) => {
        //     this.setState({
        //         stories : stories
        //     })
        // })
  }

  render() {
    console.log("Storystor", toJS(StoryStore))
    const list = StoryStore.stories.map((el,index) => {
        return (
        <div key={`story_${index}`}>
        <Link to={`/stories/${el._id}`}>
            <h2>{el.title}</h2>
            <h3>{el.tagline}</h3>
            </Link>
            </div>)
    })

    return (
      <div>
        <h1>Here are all the stories!</h1>
        {list}
      </div>
    );
  }
}

export default observer(Stories);
