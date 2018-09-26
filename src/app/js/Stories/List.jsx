import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {observer} from "mobx-react"
import { toJS} from "mobx"

import api from "../utils/api"
import StoryStore from "../../Store/StoryStore";

import StoryCard from "./StoryCard"
import Search from "./Search"



class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        query: ""
      }
    }

    this._handleSearchQuery = this._handleSearchQuery.bind(this)

  }

  _handleSearchQuery(key, newValue) {
    this.setState({
      search: {
        [key]: newValue
      }
    })
  }

  componentDidMount() {

    StoryStore.setStories()
 
  }

  render() {

    const list = StoryStore.stories
    .filter(story => story.title.toLowerCase().includes(this.state.search.query.toLowerCase()))
    .map((el,index) => {
        return  <StoryCard key={`story_${index}`} story={el} />
    })

    return (
      <div>
        <h1>Here are all the stories!</h1>
        <Search handleSearchQuery={this._handleSearchQuery} search={this.state.search} />
        <Link to="/stories/new"><button>Add a new Story here</button></Link>
        <div className="stories-container">
        {list}
        </div>
      </div>
    );
  }
}

export default observer(List);
