import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getList, deleteForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardCartsContainer extends Component {
  componentDidMount() {
    this.props.getList('carts')
  }
  render() {
    const { carts, deleteForm } = this.props

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
                <th></th>
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
                  <td><a className='btn btn-danger btn-sm' onClick={() => deleteForm('carts', cart.id) }>刪除</a></td>
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
  getList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    carts: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getList, deleteForm }
)(DashboardCartsContainer)
