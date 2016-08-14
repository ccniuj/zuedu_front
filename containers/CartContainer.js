import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { submitForm, getAllProducts, getCart, clientRender } from '../actions'
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
    const { applicants, submitForm, getCart, params } = this.props
    const submits = applicants.map(applicant => {
      let attributes = [
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
    const { applicants, total } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const hasProducts = applicants.length > 0

    return (
      <div className='container' style={style}>
        <center><h3>購物車</h3></center>
        {
          applicants.map(applicant => 
            <ApplicantForm ref={`applicant_${applicant.id}`} 
                           key={applicant.id} 
                           applicant={applicant} />
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
    applicants: state.cart.form.line_items,
    total: getTotal(state),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts, submitForm, getCart, clientRender }
)(CartContainer)
