import React, { Component } from 'react'
import { Link } from 'react-router'
export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <h2>Shopping Cart Example</h2>
        <Link to='/products'>Products</Link><br/>
        <Link to='/cart'>Cart</Link>
        {children}
      </div>
    )
  }
}
