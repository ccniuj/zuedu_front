import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

export default class Home extends Component {
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      paddingLeft: '0px', 
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px'
    }
    return (
      <div className='container-fluid' style={style}>
        <img style={{width: '100%'}} src='https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/13112981_1706155963001405_7548779658806243038_o.jpg'/>
      </div>
    )
  }
}

Home.propTypes = {
}

function mapStateToProps(state) {
  return {
    serverRender: state.serverRender
  }
}

export default connect(mapStateToProps, { clientRender })(Home)
