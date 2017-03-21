import React, { Component } from 'react'
import { Link } from 'react-router'
import NavbarInstance from './NavbarInstance'
import Footer from '../components/Footer'

export default class App extends Component {
  render() {
    const { children, location } = this.props
    return (
      <div>
        <img className='navbar-logo' src='/images/pic1.png' />
        <NavbarInstance location={location}  />
        {children}
        <Footer>
          <button />
        </Footer>

      </div>
    )
  }
}
