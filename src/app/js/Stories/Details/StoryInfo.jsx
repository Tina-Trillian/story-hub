import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import { observer } from "mobx-react";
import { toJS } from "mobx";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import StoryStore from "../../../Store/StoryStore";
import NewCharacter from "../NewCharacter";
import CharacterCard from "./CharacterCard";



class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

  render() {


    const story = StoryStore.story
    let contributors, characters, originalAuthor;
    if (story.content) {
      contributors = story.contributors.map((el, index) => {
        return <Link to={`/profile/${el._id}`} key={`cont_${index}`}><button className="btn">{el.username}</button></Link>
      })
      characters = story.characters.map((el, index) => {
        return <CharacterCard key={`char_${index}`} character={el} />
      })
      originalAuthor = <Link to={`/profile/${story.originalAuthorId._id}`}><button className="btn my-3">{story.originalAuthorId.username}</button></Link>
      }

      console.log(toJS(story))

    return (
      <div className="info-container">
      <div>
        <h4>Story was started by</h4>
        {originalAuthor}
      </div>
        <h4>Contributors</h4>
        <div className="contributors my-3">
        {contributors}
        </div>
        <h4>Characters</h4>
        <div className="characters">
        {characters}
        </div>
        {!StoryStore.adding_character && <button className="btn my-4" onClick={() => {
          StoryStore.handleInputChange("adding_character", true)}}>Add a character to the story</button>}
        <br/>
        <br/>
        {StoryStore.adding_character && <NewCharacter />}
        <button className="btn my-4" onClick={this.toggle}>Add a character with modal</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <NewCharacter />
          {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default withRouter(observer(Details));

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

// class ModalExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false
//     };

    
//   }

 

//   render() {
//     return (
//       <div>
//         <Button color="danger" onClick={>{this.props.buttonLabel}</Button>
//         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//           <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
//           <ModalBody>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
//             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default ModalExample;
