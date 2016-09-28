import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import DashboardNavbarInstance from './DashboardNavbarInstance'

class Dashboard extends Component {
  render() {
    const { children } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    return (
      <div>
        <DashboardNavbarInstance />
        <div style={style}>
          <div className='col-md-3 col-xs-3' style={{padding: '30px'}}>
            <div className="list-group">
              <Link to="/dashboard/products" className="list-group-item">課程</Link>
              <Link to="/dashboard/carts" className="list-group-item">購物車</Link>
              <Link to="/dashboard/members" className="list-group-item">會員</Link>
              <Link to="/dashboard/orders" className="list-group-item">訂單</Link>
              <Link to="/dashboard/applicants" className="list-group-item">報名資料</Link>
              <Link to="/dashboard/discounts" className="list-group-item">折扣</Link>
            </div>
          </div>
          <div className='col-md-9 col-xs-9'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(Dashboard)
