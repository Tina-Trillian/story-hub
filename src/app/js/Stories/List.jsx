import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {observer} from "mobx-react"
import { toJS} from "mobx"

import {withRouter} from "react-router"

import api from "../utils/api"
import StoryStore from "../../Store/StoryStore";

import StoryCard from "./StoryCard"
import Search from "./Search"
import NewStoryStore from "../../Store/NewStoryStore";



class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        query: "",
        minWords: 0,
        genre: "No filter"
      }
    }

    this._handleSearchQuery = this._handleSearchQuery.bind(this)
    this._resetSearchQuery = this._resetSearchQuery.bind(this)
  }

  _handleSearchQuery(key, newValue) {
    if (newValue < 0) newValue = 0

    this.setState({
      search: {
        ...this.state.search, [key] : newValue
      }
    })
  }

  _resetSearchQuery() {
    this.setState({
      search: {
        query: "",
        minWords: 0,
        genre: "No filter"
      }
    })
  }

  componentDidMount() {

    StoryStore.setStories()
    this._handleSearchQuery("genre", this.props.match.params.filter)

  }

  render() {

    
    const filter = !this.state.search.genre ? "No filter" : this.state.search.genre
    console.log(filter)

    const list = StoryStore.stories
    .filter(story => story.title.toLowerCase().includes(this.state.search.query.toLowerCase()))
    .filter(story => story.length >= this.state.search.minWords)
    .filter(story => filter === "No filter" || story.genre.indexOf(this.state.search.genre) > -1)
    .map((el,index) => {
        return  <StoryCard key={`story_${index}`} story={el} />
    })

    return (
      <div>
        <h1>Here are all the stories!</h1>
        <Search
        handleSearchQuery={this._handleSearchQuery}
        search={this.state.search}
        resetSearchQuery={this._resetSearchQuery} />
        <Link to="/stories/new"><button>Add a new Story here</button></Link>
        <div className="stories-container">
        {list}
        </div>
      </div>
    );
  }
}

export default withRouter(observer(List));
