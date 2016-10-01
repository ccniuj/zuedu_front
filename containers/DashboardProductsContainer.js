import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardProductsContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('products')
  }
  render() {
    const { products, getDashboardList, deleteDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>課程</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>名稱</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { products.map(product => 
                <tr key={product.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${product.id}`}>
                      {product.id}
                    </Link>
                  </td>
                  <td>{product.name}</td>
                  <td><a className='btn btn-danger btn-sm' 
                         onClick={
                           () => deleteDashboardForm('products', product.id).
                             then(() => getDashboardList('products'))
                         }>刪除</a></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Link className='btn btn-success' to={`${this.props.route.path}/new`}>新增</Link>
        </div>
      </div>
    )
  }
}

DashboardProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm }
)(DashboardProductsContainer)
