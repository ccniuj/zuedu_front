import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default class Footer extends Component {
  onClick(){

  }
  render() {
    return (
      <footer className='footer-container'>
        <div className='col-xs-4 text-center'>
          <img className='footer-logo' src='/images/logo_footer.png' />
        </div>
        <LinkContainer to={{ pathname: '/' }}>
            <button className="btn btn-secondary">Home</button>
        </LinkContainer>
        <div className='col-xs-4 col-xs-offset-4 text-left'>
          信箱：zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
          客服：0975-467-941<br/>
        </div>
      </footer>
    )
  }
}
