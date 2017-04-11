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
    let exclusion = ['id', 'product_details', 'type']
    Object.keys(nextProps.product).forEach(key => {
      if (!exclusion.includes(key)) {
        this.refs[key].value = nextProps.product[key]
      }
    })
  }
  render() {
    const { params, product, getDashboardForm, submitDashboardForm, deleteDashboardForm, route } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>課程</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(product.type, 'products', product.id, 
                  Object.assign({}, 
                    ...Object.keys(this.refs).map(key => 
                      { return { [key]: this.refs[key].value }}
                    ))
                ).then(() => browserHistory.push('/dashboard/products'))
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
            <label htmlFor='subtitle'>副標題</label>
            <textarea ref='subtitle' name='subtitle' placeholder='輸入副標題' rows='5' style={{width: '100%'}} defaultValue={product.subtitle}>
            </textarea>
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
            <label htmlFor='description'>說明</label>
            <textarea ref='description' name='description' placeholder='輸入說明' rows='5' style={{width: '100%'}} defaultValue={product.description}>
            </textarea>
            <br/>
            <br/>
            <label htmlFor='dimension'>向度</label>
            <textarea ref='dimension' name='dimension' placeholder='輸入向度' rows='5' style={{width: '100%'}} defaultValue={product.dimension}>
            </textarea>
            <br/>
            <br/>
            <label htmlFor='pricing'>報名費用說明</label>
            <textarea ref='pricing' name='pricing' placeholder='輸入報名費用說明' rows='5' style={{width: '100%'}} defaultValue={product.pricing}>
            </textarea>
            <br/>
            <br/>
            <label htmlFor='target'>對象</label>
            <input ref='target' type='text' name='target' placeholder='輸入對象' style={{width: '100%'}} defaultValue={product.target} />
            <br/>
            <br/>
            <label htmlFor='cover_image_url'>封面圖片連結</label>
            <input ref='cover_image_url' type='text' name='cover_image_url' placeholder='輸入封面圖片連結' style={{width: '100%'}} defaultValue={product.cover_image_url} />
            <br/>
            <br/>
            <label htmlFor='outline_image_url'>大綱圖片連結</label>
            <input ref='outline_image_url' type='text' name='outline_image_url' placeholder='輸入大綱圖片連結' style={{width: '100%'}} defaultValue={product.outline_image_url} />
            <br/>
            <br/>
            <label htmlFor='dimension_image_url'>向度圖片連結</label>
            <input ref='dimension_image_url' type='text' name='dimension_image_url' placeholder='輸入大綱圖片連結' style={{width: '100%'}} defaultValue={product.dimension_image_url} />
            <br/>
            <label htmlFor='activityUrl'> 活動圖片連結</label>
            <input ref='activityUrl' type='text' name='activityUrl' placeholder='輸入活動圖片連結' style={{width: '100%'}} defaultValue={product.activityUrl} />
            
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
