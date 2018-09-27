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
      <div>
        <input
          className="input"
          type="text"
          onChange={evt => handleSearchQuery("query", evt.target.value)}
          value={search.query}
          placeholder="Search for a title"
        />
        <br />
        <input
          className="input"
          type="number"
          step="10"
          min="0"
          onChange={evt => handleSearchQuery("minWords", evt.target.value)}
          value={search.minWords}
        />
         <br />
        <Input
        type="select"
        name="select"
        onChange={evt => handleSearchQuery("genre", evt.target.value)}
        value={search.genre}
        >
        <option>No filter</option>
          {list}
        </Input>
        <br />
        <Input
        type="select"
        name="select"
        onChange={evt => handleSearchQuery("sort", evt.target.value)}
        value={search.sort}
        >
        <option>Date Posted</option>
        <option>Date Updated</option>
        <option>Word Count</option>
        <option>Title</option>
        </Input>
        <br />
        <button
        onClick={() => resetSearchQuery()}>Reset</button>
      </div>
    );
  }
  
};

export default Search;
