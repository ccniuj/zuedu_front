import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getList, deleteForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardProductsContainer extends Component {
  componentDidMount() {
    this.props.getList('products')
  }
  render() {
    const { products, deleteForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>課程</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>名稱</th>
                <th>價格</th>
                <th>庫存</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { products.map((product) => 
                <tr key={product.id}>
                  <td>
                    <Link to={`${window.location.pathname}/edit/${product.id}`}>
                      {product.id}
                    </Link>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.inventory}</td>
                  <td><a className='btn btn-danger btn-sm' onClick={() => deleteForm('products', product.id) }>刪除</a></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Link className='btn btn-success' to={`${window.location.pathname}/new`}>新增</Link>
        </div>
      </div>
    )
  }
}

DashboardProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  getList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: state.dashboard.list
  }
}

export default connect(
  mapStateToProps,
  { getList, deleteForm }
)(DashboardProductsContainer)
