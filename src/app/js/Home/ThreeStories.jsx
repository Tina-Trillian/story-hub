import React from "react";
import StoryStore from "../../Store/StoryStore";
import StoryCardHome from "./StoryCardHome";


const ThreeStories = ({stories, title}) => {

  const newStories = stories.map((story, index) => {
    return <StoryCardHome key={`str_${index}`} story={story} />;
  });


  return (
    <div className="container about my-5">
      <h1>{title}</h1>
      <hr />
      <div>
        {newStories}
      </div>
    </div>
  );
};

export default ThreeStories;
