import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getForm, submitForm, clientRender } from '../actions'

class ProductForm extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'products', params, cookie))
  }
  componentDidMount() {
    const { 
      params, 
      serverRender, 
      clientRender, 
      getForm } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'products', params.id)
    }
  }
  render() {
    const { product, submitForm } = this.props
    const style = {
      paddingTop: '50px'
    }

    return (
      <div className='container' style={style}>
        <center><h3>{ product.name }</h3></center>
        {
          product.description
        }
      </div>
    )
  }
}

ProductForm.propTypes = {
}

const mapStateToProps = state => {
  return {
    product: state.products.form,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { clientRender, getForm}
)(ProductForm)
