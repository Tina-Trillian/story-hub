import React, { Component } from "react";
import { observer } from "mobx-react";

import NewPartStore from "../../Store/NewPartStore";


class NewPart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="story-container part-form">
        <h2>Add a New Part</h2>
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
        
          <button
            className={`${NewPartStore.content ? "btn" : "btn inactive"}`}
            onClick={() => {
              this.props.toggle(false);
              NewPartStore.pushButton()
            }}
          >
            Add the part to the story
          </button>
        
        <button
          className="btn"
          onClick={() => {
            NewPartStore.resetPart();
            this.props.toggle(false)}}
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
