import React, { Component } from "react";
import { observer } from "mobx-react";

import NewPartStore from "../../Store/NewPartStore";


class NewPart extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container char-form">
      <br/>
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
            className={`${NewPartStore.content ? "button button-dark" : "button inactive"}`}
            onClick={() => {
              this.props.toggle(false);
              NewPartStore.pushButton()
            }}
          >
            Add the part to the story
          </button>
        
        <button
          className="button button-dark"
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
