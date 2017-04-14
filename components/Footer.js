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

          <div className=' col-sm-2 col-xs-5 footer-logo'>
            <img className='' src='/images/logo_footer.png' />
          </div>
          <div className='col-sm-4 hidden-xs footer-slogan'>
            <h4>
              Where creativity meets<br/>next generation.
            </h4>
          </div>
        <div className="col-sm-3 col-xs-6">
          <a href="https://www.facebook.com/zu.edu.tw/?ref=bookmarks">
            <img className="footer-icon"src="/images/facebook.png" alt=""/>
          </a>
          <a href="https://line.me/R/ti/p/%40ebr1368g">
            <img className="footer-icon"src="/images/line.png" alt=""/>
          </a>
        </div>

        
      </div>
    )
  }
}
/**
<div className='col-sm-3 footer-detail'>
          <h6>
            信箱：<br/>
            zubat.nthu@gmail.com<br/>
            LINE：@ebr1368g<br/>
            客服：0975-467-941<br/>
          </h6>
        </div>
<h4>

        </h4>
**/