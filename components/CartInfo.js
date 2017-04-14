import React, { Component, PropTypes} from 'react'
import { Table } from 'react-bootstrap'

export default class CartInfo extends Component {
  render() {
    const { applicants, cart_matchable_discount_name, cart_matchable_discount_factor, total } = this.props

    return (
      <div className='col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1 cart-info'>
        <h4>您已報名的課程</h4>
        <table className="col-xs-12 table table-responsive table-condensed">
          <thead>
            <tr>
              <th>姓名</th>
              <th>課程</th>
              <th>場次</th>
              <th>金額</th>
              <th>折扣</th>
            </tr>
          </thead>
          <tbody>
            {
              applicants.map(applicant => 
                <tr key={applicant.id}>
                  <td>{applicant.name == '' ? '未填姓名' : applicant.name}</td>
                  <td>{applicant.product_name}</td>
                  <td>{applicant.product_detail_description}</td>
                  <td>${applicant.price}</td>
                  <td>${cart_matchable_discount_factor || 0}</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <h4>折扣方案</h4>
        <b>{ cart_matchable_discount_name || '無' }</b>
        <br/>
        <h4>需付金額</h4>
        <b>${ total }={total+(cart_matchable_discount_factor*applicants.length)}{cart_matchable_discount_name ? ` - $${cart_matchable_discount_factor} x ${applicants.length}` : ''}</b>
      </div>
    )
  }
}
