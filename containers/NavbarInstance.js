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
    const { location, member, memberLogout } = this.props
    const redirect_url = location.pathname
    const loginLink = (member.id == '') 
      ? 
        <NavItem eventKey={3} href={`${config.domain}/members/auth/facebook?redirect_url=${redirect_url}`}>
          fb登入
        </NavItem>
      : 
        <NavItem eventKey={3} onClick={memberLogout}>
          fb登出
        </NavItem>

    const dropdown = (member.id == '')
      ? <div />
      : 
        <NavDropdown eventKey={4} title={member.name} id="basic-nav-dropdown">
          <LinkContainer to={{ pathname: '/cart' }}>
            <MenuItem eventKey={4.1} >購物車</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to={{ pathname: '/login' }}>
            <MenuItem eventKey={4.3}>管理者登入</MenuItem>
          </LinkContainer>
        </NavDropdown>

    return (
      <Navbar fixedTop>
        <Navbar.Header>
            <Link to="/">
              <img className='navbar-logo' src='/images/logo.png' />
            </Link>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/about' }}>
            <NavItem eventKey={1} href="#">關於我們</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/products' }}>
            <NavItem eventKey={2} href="#">課程介紹</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/faq' }}>
            <NavItem eventKey={3} href="#">常見問題</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/contact' }}>
            <NavItem eventKey={5} href="#">聯絡我們</NavItem>
          </LinkContainer>
          { loginLink }
          { dropdown }
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
