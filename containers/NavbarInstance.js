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
    $(this.refs.alert).hide()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.alert.timestamp != nextProps.alert.timestamp) {
      this.refs.alert.innerHTML = `<span id='alert-${nextProps.alert.alert_type}-message'>${nextProps.alert.message}</span>`
      $(this.refs.alert).fadeIn('slow', () => setTimeout(() => $(this.refs.alert).fadeOut('slow'), 2000))
    }
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
          <LinkContainer to={{ pathname: '/orders' }}>
            <MenuItem eventKey={4.2} >訂單</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to={{ pathname: '/login' }}>
            <MenuItem eventKey={4.3}>管理者登入</MenuItem>
          </LinkContainer>
        </NavDropdown>

    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
            <Link to="/">
              <img className='navbar-logo' src='/images/logo.png' />
            </Link>
            
            <Navbar.Toggle />
            
        </Navbar.Header>
        <Navbar.Collapse fluid>
          <Nav pullRight>
          <LinkContainer to={{ pathname: '/about' }}>
            <NavItem eventKey={1} href="#">關於我們</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/products' }}>
            <NavItem eventKey={2} href="#">課程介紹</NavItem>
          </LinkContainer>
          { loginLink }
          { dropdown }
          </Nav>
        </Navbar.Collapse>
        
        <div id='alert' ref='alert'/>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    member: state.member,
    serverRender: state.serverRender,
    alert: state.alert
  }
}

export default connect(mapStateToProps, {
  checkMemberLogin,
  memberLogout
})(NavbarInstance)
