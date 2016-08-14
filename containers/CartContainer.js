import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
        'note' 
      ]
      let arr = attributes.map( key => {
        return { [key]: this.refs[`applicant_${applicant.id}`].refs.form[key].value }
      })
      const payload = Object.assign({}, ...arr)
      return submitForm('edit', 'line_items', applicant.id, payload)
    })

    Promise.all(submits).then(() => getCart())
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
        <input type='submit' onClick={() => addToCart(Object.keys(products)[0]).then(() => getCart())} value='新增' />
        {
          applicants.map(applicant => 
            <ApplicantForm ref={`applicant_${applicant.id}`} 
                           key={applicant.id}
                           products={products} 
                           applicant={applicant}
                           onDelete={deleteForm}
                           onDeleteCallback={getCart} />
          )
        }
        <input type='submit' onClick={() => this.submitApplicants()} value='儲存' />
        <Link to='/orders/new'>結帳</Link>
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
