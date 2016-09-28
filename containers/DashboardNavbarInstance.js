import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from '../actions'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class DashboardNavbarInstance extends Component {
  componentDidMount() {
    $(this.refs.alert).hide()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.alert.timestamp != nextProps.alert.timestamp) {
      this.refs.alert.innerHTML = `<span>${nextProps.alert.message}</span>`
      $(this.refs.alert).fadeIn('slow', () => setTimeout(() => $(this.refs.alert).fadeOut('slow'), 2000))
    }
  }
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/dashboard">築優教育</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown eventKey={3} title="選單" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3} onClick={this.props.logout}>登出</MenuItem>
          </NavDropdown>
        </Nav>
        <div id='alert' ref='alert'/>
      </Navbar>
    )
  }
}

DashboardNavbarInstance.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps, { 
  logout 
})(DashboardNavbarInstance)
