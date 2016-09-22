import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardOrdersContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('orders')
  }
  render() {
    const { orders, getDashboardList, deleteDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>訂單</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>付款方式</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { orders.map(order => 
                <tr key={order.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.payment}</td>
                  <td><a className='btn btn-danger btn-sm' 
                         onClick={
                           () => deleteDashboardForm('orders', order.id).
                             then(() => getDashboardList('orders'))
                         }>刪除</a></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

DashboardOrdersContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    orders: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm }
)(DashboardOrdersContainer)
