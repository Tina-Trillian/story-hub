import React from "react";
import { observer } from "mobx-react";

import StoryStore from "../../Store/StoryStore";
import CarouselHome from "./Carousel";
import About from "./About"
import ThreeStories from "./ThreeStories"


class Home extends React.Component {
  componentDidMount() {
    StoryStore.getHomeStories();
    //gets all the recent Updated and stories fromt he api and stores them in
    //the StoriesStore
  }

  render() {

    return (
      <div>
        <CarouselHome />
        <About />
        {/* Setting the colors for the component so that the 
        component can be reused */}
        <ThreeStories
        title="Latest Stories"
        background_all="#987284"
        text="#E3E4DB"
        background_card="#333333"
        stories={StoryStore.latest_new}/>
        <ThreeStories
        title="Latest Updates"
        background_all="#E3E4DB"
        text="#E3E4DB"
        background_card="#987284"
        back=""
        stories={StoryStore.latest_updated}/>
      </div>
    );
  }
}

export default observer(Home);
