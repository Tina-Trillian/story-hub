// import React from "react";
// import { Link } from "react-router-dom";

// const StoryCard = ({ story }) => {
//   return (
//     <Link to={`/stories/${story._id}`} >
//       <div className="story-card"
        
//         style={{ backgroundImage: "url(" + story.picture + ")" }}
//       >
//         <h3>{story.title}</h3>
//         <h4>{story.tagline}</h4>
//       </div>
//     </Link>
//   );
// };

// export default StoryCard;

import React from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {


  return (
    <Link to={`/stories/${story._id}`} >
      <div className="story-card">
        <h3>{story.title}</h3>
        <h4>{story.tagline}</h4>
      </div>
    </Link>
  );
};

export default StoryCard;
