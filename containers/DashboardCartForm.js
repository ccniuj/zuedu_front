import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardCartForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'carts', params.id)
  }
  componentWillReceiveProps(nextProps) {
    // const { price, count } = nextProps.cart
  }
  render() {
    const { cart, submitDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>購物車</h3>
          <form>
            <label htmlFor='id'>編號</label><br/>
            {cart.id}
            <br/>
            <br/>
            <label htmlFor='count'>項數</label><br/>
            {cart.count}
            <Table responsive condensed>
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>單價</th>
                  <th>數量</th>
                </tr>
              </thead>
              <tbody>
                { cart.line_items.map(item => 
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <label htmlFor='price'>金額</label><br/>
            {cart.price}
            <br/>
            <br/>
          </form>
        </div>
      </div>
    )
  }
}

DashboardCartForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  let _state
  if (typeof(state.dashboard.form.line_items)==='undefined') {
    _state = Object.assign({}, state.dashboard.form, { line_items: [] } )
  } else {
    _state = state.dashboard.form
  }
  return {
    cart: _state
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm }
)(DashboardCartForm)
