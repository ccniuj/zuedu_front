import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default class NavbarInstance extends Component {
  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">築優教育</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/products' }}>
            <NavItem eventKey={1} href="#">課程</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/cart' }}>
            <NavItem eventKey={2} href="#">購物車</NavItem>
          </LinkContainer>
          <NavDropdown eventKey={3} title="選單" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}
