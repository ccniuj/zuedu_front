import React, { Component, PropTypes} from 'react'

export default class OrderInfo extends Component {
  componentWillReceiveProps(_, nextContext) {
    const { first_name, last_name, email, address } = nextContext.orders.form
    if (nextContext.orders.form.type!='new') {
      this.refs.first_name.value = first_name
      this.refs.last_name.value = last_name
      this.refs.email.value = email
      this.refs.address.value = address
    }
  }
  render() {
    const { products, orders, total, submitForm } = this.context
    const _payload = orders.allpay.payload ? orders.allpay.payload : {}
    const disabled = (orders.form.type=='show' ? 'disabled' : '')

    let submit_btn
    let allpay_form
    
    switch(orders.form.type) {
      case 'show':
        submit_btn = <div/>
        allpay_form = <div/>
        break
      default:
        submit_btn = <input className='btn btn-success btn-block' type='submit' value='確定' />
        allpay_form = <form id='allpay' action={orders.allpay.url} method='post' style={{display: 'none'}}>
            信用卡測試卡號: 4311-9522-2222-2222<br/>
            信用卡測試安全碼: 222<br/>
            信用卡測試有效年月: 設定在未來時間即可<br/>
            {
              Object.keys(_payload).map( (key, i) => {
                return <input key={i} type="text" name={key} defaultValue={_payload[key]} />
              })
            }
          </form>
        break
    }

    return (
      <div>
        <h3>訂單</h3>
        <form onSubmit={ e => {
              e.preventDefault()
              submitForm(orders.form.type, 'orders', null, {
                last_name: this.refs.last_name.value,
                first_name: this.refs.first_name.value,
                email: this.refs.email.value,
                address: this.refs.address.value
              })
            }}>
          <label htmlFor='last_name'>姓</label>
          <input ref='last_name' type='text' name='last_name' style={{width: '100%'}} disabled={disabled} />
          <br/>
          <br/>
          <label htmlFor='first_name'>名</label>
          <input ref='first_name' type='text' name='first_name' style={{width: '100%'}} disabled={disabled} />
          <br/>
          <br/>
          <label htmlFor='email'>信箱</label>
          <input ref='email' type='text' name='email' style={{width: '100%'}} disabled={disabled} />
          <br/>
          <br/>
          <label htmlFor='address'>運送地址</label>
          <input ref='address' type='text' name='address' style={{width: '100%'}} disabled={disabled} />
          <br/>
          <br/>
          { submit_btn }
        </form>
        { allpay_form }
      </div>
    )
  }
}

OrderInfo.contextTypes = {
  products: PropTypes.array.isRequired,
  orders: PropTypes.object.isRequired,
  total: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired
}