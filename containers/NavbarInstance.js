import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { checkMemberLogin, memberLogout } from '../actions'
import config from '../config'

class NavbarInstance extends Component {
  componentDidMount() {
    this.props.checkMemberLogin()
  }
  render() {
    const loginLink = (this.props.member.id == '') 
      ? <NavItem eventKey={3} href={`${config.domain}/members/auth/facebook`}>
          fb登入
        </NavItem>
      : <NavItem eventKey={3} onClick={this.props.memberLogout}>
          fb登出
        </NavItem>

    const dropdownTitle = (this.props.member.id == '') 
      ? '選單'
      : this.props.member.name

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
          { loginLink }
          <NavDropdown eventKey={4} title={dropdownTitle} id="basic-nav-dropdown">
            <MenuItem eventKey={4.1}>Action</MenuItem>
            <MenuItem eventKey={4.2}>Another action</MenuItem>
            <MenuItem divider />
            <LinkContainer to={{ pathname: '/login' }}>
              <MenuItem eventKey={4.3}>管理者登入</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    member: state.member
  }
}

export default connect(mapStateToProps, {
  checkMemberLogin,
  memberLogout
})(NavbarInstance)
