import React from "react";
import StoryCardHome from "./StoryCardHome";


const ThreeStories = ({stories, title, text, background_card, background_all}) => {

  //gets the three stories array from the props
  //can be adapted for different backgrounds
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
