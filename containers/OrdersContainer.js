import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getList } from '../actions'
import { Table } from 'react-bootstrap'

class OrdersContainer extends Component {
  componentDidMount() {
    this.props.getList('orders')
  }
  render() {
    const { orders } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    return (
      <div className='container-fluid' style={style}>
        <div className='col-md-12 col-xs-12'>
          <h3>訂單</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>課程</th>
              </tr>
            </thead>
            <tbody>
              { orders.map(order => 
                <tr key={order.id}>
                  <td>
                    <Link to={`${this.props.route.path}/show/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td>
                    { order.line_items.map(item => 
                      <span key={item.id}>
                        <Link to={`/orders/show/${order.id}`}>
                          {`${item.name} - ${item.product_name} `}
                        </Link><br/>
                      </span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

OrdersContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  getList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    orders: state.orders.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getList }
)(OrdersContainer)
