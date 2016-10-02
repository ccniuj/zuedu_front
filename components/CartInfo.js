import React, { Component, PropTypes} from 'react'

export default class CartInfo extends Component {
  render() {
    const { ca, cart_matchable_discount_name, cart_matchable_discount_factor, total } = this.props

    return (
      <div className='col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 cart-info'>
        <h4>您已報名的課程</h4>
        {
          Object.keys(ca).map(k => 
            <div key={k}>
              <b>{ca[k].product_name} {ca[k].product_detail_description} ${ca[k].unit_price} x {ca[k].count}</b>
            </div>
          )
        }
        <h4>折扣方案</h4>
        <b>{ cart_matchable_discount_name } -${cart_matchable_discount_factor}</b>
        <br/>
        <h4>需付金額</h4>
        <b>${ total } - ${ cart_matchable_discount_factor }</b>
      </div>
    )
  }
}
