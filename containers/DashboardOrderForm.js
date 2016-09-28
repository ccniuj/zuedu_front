import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'

class DashboardOrderForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'orders', params.id)
  }
  componentWillReceiveProps(nextProps) {
    const { first_name, last_name, email, address, discount_key } = nextProps.order
    this.refs.discount_key.value = discount_key
    this.refs.last_name.value = last_name
    this.refs.first_name.value = first_name
    this.refs.email.value = email
    this.refs.address.value = address
  }
  render() {
    const { order, submitDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>訂單</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(order.type, 'orders', order.id, {
                  discount_key: this.refs.discount_key.value,
                  last_name: this.refs.last_name.value,
                  first_name: this.refs.first_name.value,
                  email: this.refs.email.value,
                  address: this.refs.address.value
                }).then(() => browserHistory.push('/dashboard/orders'))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {order.id}
            <br/>
            <br/>
            <label htmlFor='discount_key'>優惠代碼</label>
            <input ref='discount_key' type='text' name='discount_key' placeholder='輸入折扣代碼' style={{width: '100%'}} defaultValue={order.discount_key} />
            <br/>
            <br/>
            <label htmlFor='last_name'>姓</label>
            <input ref='last_name' type='text' name='last_name' placeholder='輸入姓' style={{width: '100%'}} defaultValue={order.last_name} />
            <br/>
            <br/>
            <label htmlFor='first_name'>名</label>
            <input ref='first_name' type='text' name='first_name' placeholder='輸入名' style={{width: '100%'}} defaultValue={order.first_name} />
            <br/>
            <br/>
            <label htmlFor='member_name'>會員姓名</label><br/>
            <Link to={`/dashboard/members/edit/${order.member_id}`}>{order.member_name}</Link>
            <br/>
            <br/>
            <label htmlFor='email'>電子郵件</label>
            <input ref='email' type='text' name='email' placeholder='輸入電子郵件' style={{width: '100%'}} defaultValue={order.email} />
            <br/>
            <br/>
            <label htmlFor='address'>地址</label>
            <textarea ref='address' name='address' placeholder='輸入地址' rows='5' style={{width: '100%'}} defaultValue={order.address}>
            </textarea>
            <br/>
            <br/>
            <label htmlFor='payment'>付款方式</label><br/>
            {order.payment}
            <br/>
            <br/>
            <label htmlFor='status'>狀態</label><br/>
            {
              order.transactions 
              ? order.transactions[0].params ? '已繳費' : '未繳費'
              : ''
            }
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

DashboardOrderForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  return {
    order: state.dashboard.form
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm }
)(DashboardOrderForm)
