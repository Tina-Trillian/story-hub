import React from "react";
import StoryStore from "../../Store/StoryStore";
import StoryCardHome from "./StoryCardHome";


const ThreeStories = ({stories, title, text, background_card, background_all}) => {

  const newStories = stories.map((story, index) => {
    return <StoryCardHome
    key={`str_${index}`}
    story={story}
    text={text}
    background_card={background_card} />;
  });


  return (
    <div className={`three-stories`} style={{backgroundColor: background_all}}>
      <h1>{title}</h1>
      <hr />
      <div className="three-stories-content">
        {newStories}
      </div>
      <hr />
    </div>
  );
};

export default ThreeStories;
