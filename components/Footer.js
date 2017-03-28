import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default class Footer extends Component {
  onClick(){

  }
  render() {
    return (
      <footer className='row footer-container'>
      <div className="row">
        <div className="col-md-5 col-xs-5 footerlogo ">
          <div className="row ">
          <div className='col-md-6 footer-logo'>
            <img className='col-md-9 col-md-offset-1 col-xs-6' src='/images/logo_footer.png' />
          </div>
          <div className='col-md-6 col-xs-6 footer-slogan'>
            <br/>
            <h4>Where creativity meets</h4><h4>next generation.</h4>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-xs-7">
        <div className="col-md-4 col-xs-6 footer-icon">
          <img className="col-xs-6 "src="images/facebook.png" alt=""/>
          <img className="col-xs-6"src="images/line.png" alt=""/>
        </div>
        <div className='col-md-8 col-md-offset-0 col-xs-6 col-xs-offset-0 footer-detail'>
        <h4>
          信箱：zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
          客服：0975-467-941<br/>
          辦公室地址:<br/>
        </h4>
          
        </div>
        </div>
      </div>
      </footer>
    )
  }
}
