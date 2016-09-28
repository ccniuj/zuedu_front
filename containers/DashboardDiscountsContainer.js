import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardDiscountsContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('discounts')
  }
  render() {
    const { discounts, getDashboardList, deleteDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>折扣</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>名稱</th>
                <th>類型</th>
                <th>滿足條件</th>
                <th>總金額/總折扣</th>
              </tr>
            </thead>
            <tbody>
              { discounts.map(discount => 
                <tr key={discount.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${discount.id}`}>
                      {discount.id}
                    </Link>
                  </td>
                  <td>{discount.name}</td>
                  <td>{discount.discount_type}</td>
                  <td>{discount.prerequisite}</td>
                  <td>{discount.factor}</td>
                  <td><a className='btn btn-danger btn-sm' 
                         onClick={
                           () => deleteDashboardForm('discounts', discount.id).
                             then(() => getDashboardList('discounts'))
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

DashboardDiscountsContainer.propTypes = {
  discounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    discounts: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm }
)(DashboardDiscountsContainer)
