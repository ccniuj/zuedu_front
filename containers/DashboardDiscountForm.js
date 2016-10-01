import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getDashboardForm, submitDashboardForm, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardDiscountForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'discounts', params.id)
  }
  componentWillReceiveProps(nextProps) {
    const { name, discount_type, prerequisite, factor, date_from, date_to } = nextProps.discount
    this.refs.name.value = name
    this.refs.discount_type.value = discount_type
    this.refs.prerequisite.value = prerequisite
    this.refs.factor.value = factor
    this.refs.date_from.value = date_from
    this.refs.date_to.value = date_to
  }
  render() {
    const { params, discount, getDashboardForm, submitDashboardForm, deleteDashboardForm, route } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>折扣</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(discount.type, 'discounts', discount.id, {
                  name: this.refs.name.value,
                  discount_type: this.refs.discount_type.value,
                  prerequisite: this.refs.prerequisite.value,
                  factor: this.refs.factor.value,
                  date_from: this.refs.date_from.value,
                  date_to: this.refs.date_to.value
                }).then(() => browserHistory.push('/dashboard/discounts'))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {discount.id}
            <br/>
            <br/>
            <label htmlFor='key'>代碼</label><br/>
            {discount.key}
            <br/>
            <br/>
            <label htmlFor='name'>名稱</label>
            <input ref='name' type='text' name='name' placeholder='輸入名稱' style={{width: '100%'}} defaultValue={discount.name} />
            <br/>
            <br/>
            <label htmlFor='discount_type'>折扣類型</label><br/>
            <select ref='discount_type' name='discount_type' defaultValue={discount.discount_type}>
              <option value="group_discount">團報</option>
              <option value="earlybird_discount">早鳥</option>
              <option value="group_and_earlybird_discount">團報加早鳥</option>
            </select>
            <br/>
            <br/>
            <label htmlFor='prerequisite'>滿足條件</label>
            <input ref='prerequisite' type='text' name='prerequisite' placeholder='輸入滿足條件' style={{width: '100%'}} defaultValue={discount.prerequisite} />
            <br/>
            <br/>
            <label htmlFor='factor'>折扣金額</label>
            <input ref='factor' type='text' name='factor' placeholder='輸入折扣金額' style={{width: '100%'}} defaultValue={discount.factor} />
            <br/>
            <br/>
            <label htmlFor='date_from'>開始日期</label>
            <input ref='date_from' type='date' name='date_from' placeholder='輸入開始日期' style={{width: '100%'}} defaultValue={discount.date_from} />
            <br/>
            <br/>
            <label htmlFor='date_to'>結束日期</label>
            <input ref='date_to' type='date' name='date_to' placeholder='輸入開始日期' style={{width: '100%'}} defaultValue={discount.date_to} />
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

DashboardDiscountForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  return {
    discount: state.dashboard.form
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm, deleteDashboardForm }
)(DashboardDiscountForm)
