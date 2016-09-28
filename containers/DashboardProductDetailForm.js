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
    const { description, place, date_from, date_to, time_from, time_to } = nextProps.productDetail
    this.refs.description.value = description
    this.refs.place.value = place
    this.refs.date_from.value = date_from
    this.refs.date_to.value = date_to
    this.refs.time_from.value = time_from
    this.refs.time_to.value = time_to
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
                  product_id: productDetail.type == 'edit' ? productDetail.product_id : params.id,
                  description: this.refs.description.value,
                  place: this.refs.place.value,
                  date_from: this.refs.date_from.value,
                  date_to: this.refs.date_to.value,
                  time_from: this.refs.time_from.value,
                  time_to: this.refs.time_to.value
                }).then(() => browserHistory.push(`/dashboard/products/edit/${productDetail.product_id ? productDetail.product_id : params.id}`))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {productDetail.id}
            <br/>
            <br/>
            <label htmlFor='description'>場次</label>
            <input ref='description' type='text' name='description' placeholder='輸入場次' style={{width: '100%'}} defaultValue={productDetail.description} />
            <br/>
            <br/>
            <label htmlFor='place'>地點</label>
            <input ref='place' type='text' name='place' placeholder='輸入地點' style={{width: '100%'}} defaultValue={productDetail.place} />
            <br/>
            <br/>
            <label htmlFor='date_from'>開始日期</label>
            <input ref='date_from' type='date' name='date_from' style={{width: '100%'}} defaultValue={productDetail.date_from} />
            <br/>
            <br/>
            <label htmlFor='date_to'>結束日期</label>
            <input ref='date_to' type='date' name='date_to' style={{width: '100%'}} defaultValue={productDetail.date_to} />
            <br/>
            <br/>
            <label htmlFor='time_from'>開始時間</label>
            <input ref='time_from' type='time' name='time_from' style={{width: '100%'}} defaultValue={productDetail.time_from} />
            <br/>
            <br/>
            <label htmlFor='time_to'>結束時間</label>
            <input ref='time_to' type='time' name='time_to' style={{width: '100%'}} defaultValue={productDetail.time_to} />
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
