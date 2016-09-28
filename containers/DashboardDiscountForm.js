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
    const { name, discount_type, prerequisite, factor } = nextProps.discount
    this.refs.name.value = name
    this.refs.discount_type.value = discount_type
    this.refs.prerequisite.value = prerequisite
    this.refs.factor.value = factor
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
                  factor: this.refs.factor.value
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
            <select ref='discount_type' name='discount_type' defaultValue={discount.discount_type}>
              <option value="absolute">總價型</option>
              <option value="relative">折扣型</option>
            </select>
            <br/>
            <br/>
            <label htmlFor='prerequisite'>滿足條件</label>
            <input ref='prerequisite' type='text' name='prerequisite' placeholder='輸入滿足條件' style={{width: '100%'}} defaultValue={discount.prerequisite} />
            <br/>
            <br/>
            <label htmlFor='factor'>總金額/總折扣</label>
            <input ref='factor' type='text' name='factor' placeholder='輸入總金額/總折扣' style={{width: '100%'}} defaultValue={discount.factor} />
            <br/>
            <br/>
            <input type="time" name="time" />
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
