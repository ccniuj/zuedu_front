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
    const redirect_url = this.props.location.pathname
    const loginLink = (this.props.member.id == '') 
      ? <NavItem eventKey={3} href={`${config.domain}/members/auth/facebook?redirect_url=${redirect_url}`}>
          fb登入
        </NavItem>
      : <NavItem eventKey={3} onClick={this.props.memberLogout}>
          fb登出
        </NavItem>

    const dropdownTitle = (this.props.member.id == '') 
      ? '選單'
      : this.props.member.name

    return (
      <Navbar fixedTop>
        <Navbar.Header>
            <Link to="/">
              <img className='navbar-logo' src='/images/logo.png' />
            </Link>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/about' }}>
            <NavItem eventKey={1} href="#">關於</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/products' }}>
            <NavItem eventKey={2} href="#">課程介紹</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/fqa' }}>
            <NavItem eventKey={3} href="#">常見問題</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/contact' }}>
            <NavItem eventKey={5} href="#">聯絡我們</NavItem>
          </LinkContainer>
          {
            // <LinkContainer to={{ pathname: '/cart' }}>
            //   <NavItem eventKey={6} href="#">購物車</NavItem>
            // </LinkContainer>
          }
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
    member: state.member,
    serverRender: state.serverRender
  }
}

export default connect(mapStateToProps, {
  checkMemberLogin,
  memberLogout
})(NavbarInstance)
