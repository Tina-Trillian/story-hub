import React from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story, background_card, text }) => {
  return (
    <Link to={`/stories/${story._id}`}
    className="story-card"
    style={{backgroundImage: "url(" + story.picture + ")"}}>
    <div style={{color: text, backgroundColor: background_card}} className="card-content">
        <h3 >{story.title}</h3>
        <h4 ><i>{story.tagline}</i></h4>
        <h4>{story.length} words</h4>
        </div>

    </Link>
  );
};

export default StoryCard;
