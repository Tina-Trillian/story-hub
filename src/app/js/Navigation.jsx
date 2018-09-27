import { observer } from 'mobx-react'

import UserStore from '../Store/UserStore'

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

 class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
      console.log(UserStore.username)
    return (
      <div>
        <Navbar dark expand="md" className="redb">
          <NavbarBrand href="/" className="logo">StoryHub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {!UserStore._id && (
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/stories/all">All Stories</NavLink>
              </NavItem> 
              <NavItem>
                <NavLink href={`/auth/sign-in`}>Sign In</NavLink>
            </NavItem> 
            <NavItem>
                <NavLink href={`/auth/sign-up`}>Sign Up</NavLink>
            </NavItem> 
            </Nav>
          </Collapse>
          )}
          {UserStore._id && (
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href={`/profile/${UserStore._id}`}>My Profile</NavLink>
              </NavItem> 
              <NavItem>
                <NavLink href="/stories/all">All Stories</NavLink>
              </NavItem> 
              <NavItem>
                <NavLink href={`/stories/new`}>Add a story</NavLink>
            </NavItem> 
            <NavItem>
                <NavLink href={`/auth/logout`}>Log out</NavLink>
            </NavItem> 
            </Nav>
          </Collapse>
          )}
        </Navbar>
      </div>
    );
  }
}

export default observer(Navigation)
