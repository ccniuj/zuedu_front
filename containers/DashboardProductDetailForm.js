import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardProductDetailForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'product_details', params.id)
  }
  componentWillReceiveProps(nextProps) {
    const { description, from, to } = nextProps.productDetail
    this.refs.description.value = description
    this.refs.from.value = from
    this.refs.to.value = to
  }
  render() {
    const { params, productDetail, submitDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>課程資訊</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(productDetail.type, 'product_details', productDetail.id, {
                  product_id: params.id,
                  description: this.refs.description.value,
                  from: this.refs.from.value,
                  to: this.refs.to.value
                }).then(() => browserHistory.push(`/dashboard/products/edit/${productDetail.product_id ? productDetail.product_id : params.id}`))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {productDetail.id}
            <br/>
            <br/>
            <label htmlFor='description'>場次</label>
            <input ref='description' type='text' name='description' placeholder='輸入地點' style={{width: '100%'}} defaultValue={productDetail.description} />
            <br/>
            <br/>
            <label htmlFor='from'>開始日期</label>
            <input ref='from' type='date' name='from' style={{width: '100%'}} defaultValue={productDetail.from} />
            <br/>
            <br/>
            <label htmlFor='to'>結束日期</label>
            <input ref='to' type='date' name='to' style={{width: '100%'}} defaultValue={productDetail.to} />
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

DashboardProductDetailForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  return {
    productDetail: state.dashboard.form
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm }
)(DashboardProductDetailForm)
