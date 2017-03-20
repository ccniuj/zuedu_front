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
        <div className='col-xs-2 footer-logo'>
          <img className='' src='/images/logo_footer.png' />
        </div>
        <div className='col-xs-4 footer-slogan'>
          <h5>Where creativity meets</h5>
          <h5>next generation.</h5>
        </div>
        <div className='col-xs-6 footer-detail'>
          信箱：zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
          客服：0975-467-941<br/>
          辦公室地址:<br/>
        </div>
      </footer>
    )
  }
}
