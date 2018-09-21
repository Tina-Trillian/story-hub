import React, { Component } from "react";
import { observer } from 'mobx-react'


import NewPartStore from "../../../Store/NewPartStore"


class NewPart extends Component {

    componentDidMount() {
        // NewPartStore.setInfo()
    }

  render() {
    return (
      <div className="container">
        <h1>Add a New Part</h1>
        <br />
        <br />
        <textarea
          name="content"
          onChange={(evt) => NewPartStore.handleInputChange("content", evt.target.value)}
          value={NewPartStore.content}
          className="input"
          placeholder="What happends next?..."
          required={true}
        />
        <br />
        <br />
        <button
        onClick={() => NewPartStore.pushButton()}
        >Add the part to the story</button>
        <br />
        <br />
        {NewPartStore.error}
      </div>
    );
  }
}

export default observer(NewPart);
