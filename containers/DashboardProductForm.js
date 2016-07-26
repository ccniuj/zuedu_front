import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'

class DashboardProductForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'products', params.id)
  }
  componentWillReceiveProps(nextProps) {
    const { name, price, description, inventory } = nextProps.product
    this.refs.name.value = name
    this.refs.price.value = price
    this.refs.description.value = description
    this.refs.inventory.value = inventory
  }
  render() {
    const { product, submitDashboardForm } = this.props
    return (
      <div className='container'>
        <div className='col-md-6 col-xs-6'>
          <h3>課程</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(product.type, 'products', product.id, {
                  name: this.refs.name.value,
                  price: this.refs.price.value,
                  inventory: this.refs.inventory.value,
                  description: this.refs.description.value
                })
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {product.id}
            <br/>
            <br/>
            <label htmlFor='name'>名稱</label>
            <input ref='name' type='text' name='name' placeholder='輸入名稱' style={{width: '100%'}} devalue={product.name} />
            <br/>
            <br/>
            <label htmlFor='price'>價格</label>
            <input ref='price' type='text' name='price' placeholder='輸入價格' style={{width: '100%'}} defaultValue={product.price} />
            <br/>
            <br/>
            <label htmlFor='inventory'>庫存</label>
            <input ref='inventory' type='text' name='inventory' placeholder='輸入庫存' style={{width: '100%'}} defaultValue={product.inventory} />
            <br/>
            <br/>
            <label htmlFor='description'>說明</label>
            <textarea ref='description' name='description' placeholder='輸入說明' rows='5' style={{width: '100%'}} defaultValue={product.description}>
            </textarea>
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

DashboardProductForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })
  })
}

function mapStateToProps(state) {
  return {
    product: state.dashboard.form
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm }
)(DashboardProductForm)
