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
      <div className="row">
        <div className="col-md-5 col-xs-4">
          <div className="row">
          <div className='col-md-6 footer-logo'>
            <img className='col-md-10 col-md-offset-1' src='/images/logo_footer.png' />
          </div>
          <div className='col-md-6 footer-slogan'>
            <h5>Where creativity meets<br/>next generation.</h5>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-xs-8">
        <div className="col-md-4 col-xs-6">
          <img className="col-md-6"src="images/facebook.png" alt=""/>
          <img className="col-md-6"src="images/line.png" alt=""/>
        </div>
        <div className='col-md-8 col-xs-6 footer-detail'>
          信箱：zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
          客服：0975-467-941<br/>
          辦公室地址:<br/>
        </div>
        </div>
      </div>
      </footer>
    )
  }
}
