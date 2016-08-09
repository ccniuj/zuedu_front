import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getForm, getCart, clientRender } from '../actions'

class ApplicantsContainer extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'products', params, cookie)).
             then(() => store.dispatch(getCart(cookie)))
  }
  
  componentDidMount() {
    const { getForm, getCart, clientRender, serverRender, params } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'products', params.id).
        then(() => getCart())
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }
    const { product } = this.props

    return (
      <div className='container' style={style}>
        <div>
          <center><h3>報名</h3></center>
          { product.id }
        </div>
      </div>
    )
  }
}

ApplicantsContainer.propTypes = {
}

function mapStateToProps(state) {
  return {
    product: state.products.form,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getForm, clientRender }
)(ApplicantsContainer)
