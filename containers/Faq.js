import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

class Faq extends Component {
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    return (
      <div className='container' style={style}>
        <center><h3>常見問題</h3></center>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    serverRender: state.serverRender
  }
}
export default connect(mapStateToProps, { clientRender })(Faq)
