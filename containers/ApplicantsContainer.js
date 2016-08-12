import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getForm, submitForm, getList, getCart, clientRender } from '../actions'

class ApplicantsContainer extends Component {
  constructor(props) {
    super(props)
    this.submitApplicants = () => this._submitApplicants()

  }
  componentDidMount() {
    const { member, getForm, getList, clientRender, serverRender, params } = this.props

    if (serverRender) {
      clientRender()
    }

    getForm('show', 'products', params.id).
      then(() => getList('applicants', { product_id: params.id }))

  }
  _submitApplicants() {
    const { applicants, submitForm, getList, params } = this.props

    const submits = applicants.map(applicant => {
      const payload = {
        name:         this.refs[`applicant_${applicant.id}`].name.value,
        phone_number: this.refs[`applicant_${applicant.id}`].phone_number.value
      }
      return submitForm('edit', 'applicants', applicant.id, payload)
    })

    Promise.all(submits).then(() => getList('applicants', { product_id: params.id }))
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }
    const { product, applicants } = this.props

    return (
      <div className='container' style={style}>
        <div>
          <center><h3>報名</h3></center>
          { product.id }
          <br />
          {
            applicants.map(applicant => 
              <form ref={`applicant_${applicant.id}`} key={applicant.id}>
                { applicant.id }<br />
                姓名：<input type='text' name='name' defaultValue={applicant.name} /><br/>
                電話：<input type='text' name='phone_number' defaultValue={applicant.phone_number} /><br/>
              </form>
            )
          }
          <input type='submit' onClick={() => this.submitApplicants()} value='儲存' />
          <Link to='/orders/new'>付款</Link>
        </div>
      </div>
    )
  }
}

ApplicantsContainer.propTypes = {
}

function mapStateToProps(state) {
  return {
    applicants: state.member.applicants,
    product: state.products.form,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getForm, submitForm, getList, clientRender }
)(ApplicantsContainer)
