import React, { Component, PropTypes} from 'react'

export default class CartInfo extends Component {
  render() {
    const { applicants, cart_matchable_discount_name, cart_matchable_discount_factor, total } = this.props

    return (
      <div className='col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 cart-info'>
        <h4>您已報名的課程</h4>
        {
          applicants.map(applicant => 
            <div key={applicant.id}>
              <b>{applicant.product_name} {applicant.product_detail_description} ${applicant.price}</b>
              <b> 報名學員：{ applicant.name == '' ? '未填姓名' : applicant.name}</b>
            </div>
          )
        }
        <h4>折扣方案</h4>
        <b>{ cart_matchable_discount_name } -${cart_matchable_discount_factor}</b>
        <br/>
        <h4>需付金額</h4>
        <b>${ total } - ${ cart_matchable_discount_factor } x { applicants.length }</b>
      </div>
    )
  }
}
