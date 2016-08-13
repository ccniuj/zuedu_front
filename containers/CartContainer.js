import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { checkout, getAllProducts, getCart, clientRender } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

class CartContainer extends Component {
  static fetchData({ store, cookie }) {
    return store.dispatch(getAllProducts(cookie)).
             then(() => store.dispatch(getCart(cookie)))
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getAllProducts().
        then(() => this.props.getCart())
    }
  }
  render() {
    const { applicants, total } = this.props
    const style = {
      paddingTop: '50px'
    }
    const hasProducts = applicants.length > 0
    const link = hasProducts ? 
      <Link to='/orders/new'
        disabled={hasProducts ? '' : 'disabled'}>
        結帳
      </Link> :
      <div/>

    return (
      <div className='container' style={style}>
        {
          applicants.map(applicant => 
            <form ref={`applicant_${applicant.id}`} key={applicant.id}>
              { applicant.id }<br />
              姓名：<input type='text' name='name' defaultValue={applicant.name} /><br/>
              電話：<input type='text' name='phone_number' defaultValue={applicant.phone_number} /><br/>
            </form>
          )
        }
        { link }
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
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
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
  { checkout, getAllProducts, getCart, clientRender }
)(CartContainer)
