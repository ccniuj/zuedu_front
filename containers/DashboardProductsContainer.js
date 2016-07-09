import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../actions/dashboard'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'
import { Table } from 'react-bootstrap'

class DashboardProductsContainer extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    const { products } = this.props
    return (
      <div className='container'>
        <h3>課程</h3>
        <Table responsive condensed>
          <thead>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>價格</th>
              <th>庫存</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product) => 
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.inventory}</td>
              </tr>
            )}
          </tbody>
        </Table>
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
  getAllProducts: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products)
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts }
)(DashboardProductsContainer)
