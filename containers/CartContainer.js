import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { addToCart, submitForm, deleteForm, getAllProducts, getCart, clientRender } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import ApplicantForm from '../components/ApplicantForm'

class CartContainer extends Component {
  static fetchData({ store, cookie }) {
    return store.dispatch(getAllProducts(cookie)).
             then(() => store.dispatch(getCart(cookie)))
  }
  constructor(props) {
    super(props)
    this.submitApplicants = () => this._submitApplicants()
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getAllProducts().
        then(() => this.props.getCart())
    }
  }
  _submitApplicants() {
    const { applicants, submitForm, deleteForm, getCart, params } = this.props
    const submits = applicants.map(applicant => {
      let attributes = [
        'product_id',
        'name', 
        'birth', 
        'gender', 
        'ss_number', 
        'school', 
        'grade', 
        'food_preference', 
        'note',
        'parent_phone_number',
        'parent_email' 
      ]
      let arr = attributes.map( key => {
        return { [key]: this.refs[`applicant_${applicant.id}`].refs.form[key].value }
      })
      const payload = Object.assign({}, ...arr)
      return submitForm('edit', 'line_items', applicant.id, payload)
    })

    return Promise.all(submits).then(() => getCart(), err => Promise.reject(err))
  }
  render() {
    const { products, applicants, total, addToCart, deleteForm, getCart } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const hasProducts = applicants.length > 0

    return (
      <div className='container' style={style}>
        <center><h3>購物車</h3></center>
        <div className='col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 cart-btns'>
          <ul>
            <li>請輸入學生及聯絡人資料，並選擇這位學生要參加的梯次。</li>
            <li>若要團報，請先填寫一位學生的資料，點選“新增”按鈕；再填寫另一位學生的資料。</li>
          </ul>
          <input type='submit' className='btn btn-info btn-sm' onClick={() => addToCart(parseInt(Object.keys(products)[0])).then(() => getCart(), err => console.log(err))} value='新增' />
          { 
            applicants.length > 0 
            ? <input type='submit' 
                     className='btn btn-info btn-sm pull-right' 
                     onClick={() => this.submitApplicants().
                       then(() => browserHistory.push('/orders/new'), 
                            err => console.log(err) )} 
                     value='結帳' />
            : <div/>
          }
          { 
            applicants.length > 0 
            ? <input type='submit' 
                     className='btn btn-success btn-sm pull-right' 
                     onClick={() => this.submitApplicants().
                        then( null, 
                              err => console.log(err) )} 
                     value='儲存' />
            : <div/>
          }
        </div>
        { applicants.map(applicant => 
            <ApplicantForm ref={`applicant_${applicant.id}`} 
                           key={applicant.id}
                           type='edit'
                           products={products} 
                           applicant={applicant}
                           onDelete={deleteForm}
                           onDeleteCallback={getCart} />
        )}
      </div>
    )
  }
}

CartContainer.propTypes = {
  applicants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unit_price: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string
}

const mapStateToProps = state => {
  return {
    products: state.products.byId,
    applicants: state.cart.form.line_items,
    total: getTotal(state),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts, submitForm, deleteForm, getCart, clientRender, addToCart }
)(CartContainer)
