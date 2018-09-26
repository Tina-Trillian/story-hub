import React, { Component } from "react";
import {withRouter} from "react-router"
import {observer} from "mobx-react"


import UserStore from "../../Store/UserStore";
import NewCharStore from "../../Store/NewCharStore";




@observer
class Character extends Component {


  render() {
    NewCharStore.checkIfFilled()
    NewCharStore.handleInputChange("story", this.props.match.params.id)
    NewCharStore.handleInputChange("authorName", UserStore.username)        
    NewCharStore.handleInputChange("authorId", UserStore._id)
    return (
      <div className="container char-form my-4">
        <input
          name="name"
          onChange={evt =>
            NewCharStore.handleInputChange("name", evt.target.value)
          }
          value={NewCharStore.name}
          className={`input ${NewCharStore.name ? "green" : "red"}`}          
          type="text"
          placeholder="name"
          required={true}
        />
        <br />
        <br />
        <select
          name="gender"
          onChange={evt => NewCharStore.handleInputChange("gender", evt.target.value)}          
          value={NewCharStore.gender}
          className={`input ${NewCharStore.gender ? "green" : "red"}`}          
          type="text"
          required={true}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-Binary</option>
          <option value="other">Other</option>
        </select>
        <br />
        <br />
        <textarea
          name="description"
          onChange={evt => NewCharStore.handleInputChange("description", evt.target.value)}
          value={NewCharStore.description}
          className={`input ${NewCharStore.description ? "green" : "red"}`}          
          type="text"
          placeholder="What's your character like? Tell us the others more!"
          required={true}
        />
           <br />
        <br />
        <input
          name="age"
          onChange={evt => NewCharStore.handleInputChange("age", evt.target.value)}          
          value={NewCharStore.age}
          className={`input ${NewCharStore.age ? "green" : "red"}`}
          type="number"
          min="0"
          placeholder="Age of your character"
          required={true}
        />
        <br />
        <button className={NewCharStore.allFilled ? "button my-3" : "button inactive my-3"}
        onClick={() => {
        this.props.toggle();
        NewCharStore.pushButton()
       }}>Add character</button>
        <button
          className="button ml-2 my-3"
          onClick={() => {
            this.props.toggle();
            NewCharStore.resetCharacter()}}
        >
          Never Mind
        </button>
      </div>
    );
  }
}

export default withRouter(Character);
