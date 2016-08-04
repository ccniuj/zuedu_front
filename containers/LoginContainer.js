import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'
import config from '../config'

class Login extends Component {
  render() {
    const { login } = this.props
    const style = {
      paddingTop: '50px',
    }
    const form_style = {
      backgroundColor: '#fff',
      boxShadow: '10px 10px 20px #888888',
      marginTop: '30px',
      marginBottom: '30px',
      padding: '50px'
    }
    return (
      <div className='container' style={style}>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3' style={form_style}>
            <form onSubmit={ e => {
                  e.preventDefault()
                  login(this.refs.email.value, this.refs.pwd.value)
                }}
              >
              <h2 className='text-center'>登入</h2>
              <label htmlFor='email'>帳號</label>
              <input ref='email' type='text' name='email' placeholder='輸入帳號' style={{width: '100%'}} />
              <br/>
              <br/>
              <label htmlFor='password'>密碼</label>
              <input ref='pwd' type='password' name='password' placeholder='輸入密碼' style={{width: '100%'}} />
              <br/>
              <br/>
              <input className='btn btn-success btn-block' type='submit' value='登入' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, {
  login
})(Login)
