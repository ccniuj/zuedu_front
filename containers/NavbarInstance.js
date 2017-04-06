import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
          <h4>fb登入</h4>
        </NavItem>
      : 
        <NavItem eventKey={3} onClick={memberLogout}>
          <h4>fb登出</h4>
        </NavItem>

    const dropdown = (member.id == '')
      ? <div />
      : 
        <NavDropdown eventKey={4} title={member.name} id="basic-nav-dropdown">

            <MenuItem eventKey={4.1} href="/cart">購物車</MenuItem>
            <MenuItem eventKey={4.2} href="/orders">訂單</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} href="/login">管理者登入</MenuItem>
        </NavDropdown>

    return (
      
      <Navbar fixedTop={true}  collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><img className='navbar-logo' src='/images/pic1.png' /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav >
            <NavItem eventKey={1} href="/about"><h4>關於我們</h4></NavItem>
            <NavItem eventKey={2} href="/products"><h4>課程介紹</h4></NavItem>
            { loginLink }
            { dropdown }

          </Nav>
        </Navbar.Collapse>
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
