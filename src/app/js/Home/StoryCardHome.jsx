import React from "react";
import { Link } from "react-router-dom";

//displays the Story passed down, can also be reused for different backgrounds
//as the color gets passed down as well
//is adatable

const StoryCard = ({ story, background_card, text }) => {
  return (
    <Link to={`/stories/${story._id}`} className="story-card-home">
        <h3 style={{color: text, backgroundColor: background_card}}>{story.title}</h3>
        <h4 style={{color: text, backgroundColor: background_card}}>{story.tagline}</h4>
        <img src={story.picture} />
    </Link>
  );
};

export default StoryCard;
