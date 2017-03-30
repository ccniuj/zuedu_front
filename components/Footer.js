import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default class Footer extends Component {
  onClick(){

  }
  render() {
    return (
      <div className='container-fluid footer-container'>
      <div className="row">
        <div className="col-md-5 col-xs-6 col-sm-3 footerlogo ">
          <div className="row ">
          <div className='col-md-6 footer-logo'>
            <img className='col-md-9 col-md-offset-1 col-xs-12 col-sm-12' src='/images/logo_footer.png' />
          </div>
          <div className='col-md-6 hidden-xs hidden-sm footer-slogan'>
            <h4 className="h4">Where creativity meets</h4><h4>next generation.</h4>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-xs-6 col-sm-9">
        <div className="col-md-4 hidden-xs col-sm-6">
          <img className="col-xs-6 footer-icon"src="images/facebook.png" alt=""/>
          <img className="col-xs-6 footer-icon"src="images/line.png" alt=""/>
        </div>
        <div className='col-md-8 col-md-offset-0 col-xs-12 col-sm-6 footer-detail'>
        <address>
          信箱：<br/>
          zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
          客服：0975-467-941<br/>
        </address>
          
        </div>
        </div>
      </div>
      </div>
    )
  }
}
/**
<h4>

        </h4>
**/