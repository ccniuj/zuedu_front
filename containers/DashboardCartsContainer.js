import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardCartsContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('carts')
  }
  render() {
    const { carts, getDashboardList, deleteDashboardForm } = this.props

    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>購物車</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>項數</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              { carts.map((cart) => 
                <tr key={cart.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${cart.id}`}>
                      {cart.id}
                    </Link>
                  </td>
                  <td>{cart.count}</td>
                  <td>{cart.price}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

DashboardCartsContainer.propTypes = {
  carts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    carts: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm }
)(DashboardCartsContainer)
