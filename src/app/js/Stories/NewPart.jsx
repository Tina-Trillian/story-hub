import React, { Component } from "react";
import { observer } from "mobx-react";

import NewPartStore from "../../Store/NewPartStore";
import StoryStore from "../../Store/StoryStore";

class NewPart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <h1>Add a New Part</h1>
        <br />
        <br />
        <textarea
          name="content"
          onChange={evt =>
            NewPartStore.handleInputChange("content", evt.target.value)
          }
          value={NewPartStore.content}
          className="input"
          placeholder="What happends next?..."
          required={true}
        />
        <br />
        <br />
        {NewPartStore.content && (
          <button
            className="button"
            onClick={() =>
              NewPartStore.pushButton().then(id => {
                StoryStore.handleInputChange("adding_part", false);
              })
            }
          >
            Add the part to the story
          </button>
        )}
        <button
          className="button"
          onClick={() => {
            StoryStore.handleInputChange("adding_part", false);
            NewPartStore.resetPart();
            StoryStore.toggleUpdate()}}
        >
          Never Mind
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default observer(NewPart);
