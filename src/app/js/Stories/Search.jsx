import React from "react";
import { Label, Input } from "reactstrap";
import { toJS } from "mobx";

import NewStoryStore from "../../Store/NewStoryStore";
import { renderReporter } from "mobx-react";

class Search extends React.Component  {

  
  componentDidMount() {
    NewStoryStore.getGenre();
  }
  

  render() {

    const { handleSearchQuery, search, resetSearchQuery } = this.props

    const list = NewStoryStore.allGenre.map((el, index) => {
      return <option key={`genr_${index}`}>{el}</option>
  });

    return (
      <div className="search-container-top py-5">
      <div className="search-container">
        <input
          className="input"
          type="text"
          onChange={evt => handleSearchQuery("query", evt.target.value)}
          value={search.query}
          placeholder="Search for a title"
        />
        <input
          className="input"
          type="number"
          step="10"
          min="0"
          onChange={evt => handleSearchQuery("minWords", evt.target.value)}
          value={search.minWords}
        />
        <Input
        type="select"
        className="input"
        name="select"
        onChange={evt => handleSearchQuery("genre", evt.target.value)}
        value={search.genre}
        >
        <option>No filter</option>
          {list}
        </Input>
        <Input
        type="select"
        name="select"
        className="input"
        onChange={evt => handleSearchQuery("sort", evt.target.value)}
        value={search.sort}
        >
        <option>Date Posted</option>
        <option>Date Updated</option>
        <option>Word Count</option>
        <option>Title</option>
        </Input>
      
      </div>
      <button
        className="button"
        onClick={() => resetSearchQuery()}>Reset</button>
      </div>
    );
  }
  
};

export default Search;
