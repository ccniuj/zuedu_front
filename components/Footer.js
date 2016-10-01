import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer-container'>
        <div className='col-xs-4 text-center'>
          <img className='footer-logo' src='/images/logo_footer.png' />
        </div>
        <div className='col-xs-4 col-xs-offset-4 text-left'>
          信箱：zubat.nthu@gmail.com<br/>
          LINE：@ebr1368g<br/>
        </div>
      </footer>
    )
  }
}
