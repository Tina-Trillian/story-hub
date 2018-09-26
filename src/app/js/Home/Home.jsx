import React from "react";
import { Link } from "react-router-dom";
import { observer, renderReporter } from "mobx-react";
import UserStore from "../../Store/UserStore";
import StoryStore from "../../Store/StoryStore";
import { toJS } from "mobx";

import StoryCardHome from "./StoryCardHome";
import CarouselHome from "./Carousel";
import About from "./About"
import ThreeStories from "./ThreeStories"


class Home extends React.Component {
  componentDidMount() {
    StoryStore.getHomeStories();
  }

  render() {

    return (
      <div>
        <CarouselHome />
       
        <About />
        <ThreeStories title="Latest Stories" stories={StoryStore.latest_new}/>
        <ThreeStories title="Latest Updates" stories={StoryStore.latest_updated}/>
      </div>
    );
  }
}

export default observer(Home);
