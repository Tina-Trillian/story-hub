import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { observer } from "mobx-react";
import { toJS } from "mobx";

import StoryStore from "../../Store/StoryStore";
import NewCharacter from "./NewCharacter";
import NewPart from "./NewPart"

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

      console.log(toJS(StoryStore.story.is_being_updated))
    
    

    return (
      <div>
        <h1>Details Page</h1>
        <h2>{story.title}</h2>
        <img src={story.picture} width="200px"></img>
        <h3><i>{story.tagline}</i></h3>
        {list}
        <ul>{contributors}</ul>
        {!StoryStore.adding_character && <button onClick={() => {
          StoryStore.handleInputChange("adding_character", true)}}>Add a character to the story</button>}
        <br/>
        <br/>
        {!StoryStore.adding_part && <button onClick={() => {
          StoryStore.handleInputChange("adding_part", true);
          StoryStore.toggleUpdate()}}>Add a part to the story</button>}
        {StoryStore.adding_character && <NewCharacter />}
        {StoryStore.adding_part && <NewPart />}
        {StoryStore.story.is_being_updated && <h1>Being updated</h1>}
      </div>
    );
  }
}

export default withRouter(observer(Details));
