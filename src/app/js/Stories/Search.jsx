import React from 'react';

const Search = ({handleSearchQuery, search}) => {
 
    return (
        <div>
            <input type="text"
            onChange={(evt) => handleSearchQuery("query", evt.target.value)}
            value={search.query}/>
        </div>
    );
};

export default Search;