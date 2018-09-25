import React from 'react';
import { Link } from 'react-router-dom'

const StoryCard = ({story}) => {
    return (
        <div className="story-card" style={{backgroundImage: "url("+story.picture+")"}}>
        <Link to={`/stories/${story._id}`}>
            <h3>{story.title}</h3> </Link>
            <h4>{story.tagline}</h4>
        </div>
    );
};

export default StoryCard;