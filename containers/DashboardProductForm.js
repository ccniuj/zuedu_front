import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getDashboardForm, submitDashboardForm, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

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
    const { params, product, getDashboardForm, submitDashboardForm, deleteDashboardForm, route } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>課程</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(product.type, 'products', product.id, {
                  name: this.refs.name.value,
                  price: this.refs.price.value,
                  inventory: this.refs.inventory.value,
                  description: this.refs.description.value
                }).then(() => browserHistory.push('/dashboard/products'))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {product.id}
            <br/>
            <br/>
            <label htmlFor='name'>名稱</label>
            <input ref='name' type='text' name='name' placeholder='輸入名稱' style={{width: '100%'}} defaultValue={product.name} />
            <br/>
            <br/>
            <h4>場次列表</h4>
            <Link className='btn btn-xs btn-success' to={`/dashboard/product_details/new/${product.id}`}>新增</Link>
            <br/>
            <Table responsive condensed>
              <thead>
                <tr>
                  <th>場次</th>
                  <th>開始日期</th>
                  <th>結束日期</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { product.product_details.map(pd => 
                  <tr key={pd.id}>
                    <td>
                      <Link to={`/dashboard/product_details/edit/${pd.id}`}>
                        {pd.description}
                      </Link>
                    </td>
                    <td>{pd.from}</td>
                    <td>{pd.to}</td>
                    <td><a className='btn btn-danger btn-xs'
                          onClick={
                            () => deleteDashboardForm('product_details', pd.id).
                              then(() => getDashboardForm(params.type, 'products', product.id))
                          }>刪除</a></td>
                  </tr>
                )}
              </tbody>
            </Table>
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
  let _state
  if (typeof(state.dashboard.form.product_details)==='undefined') {
    _state = Object.assign({}, state.dashboard.form, { product_details: [] } )
  } else {
    _state = state.dashboard.form
  }
  return {
    product: _state
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm, deleteDashboardForm }
)(DashboardProductForm)
