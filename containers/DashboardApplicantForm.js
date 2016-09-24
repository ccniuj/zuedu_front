import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getAllProducts } from '../actions'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'
import ApplicantForm from '../components/ApplicantForm'

class DashboardApplicantForm extends Component {
  constructor(props) {
    super(props)
    this.submitApplicant = () => this._submitApplicant()
  }
  _submitApplicant() {
    const { applicant, submitDashboardForm } = this.props
    let attributes = [
      'product_id',
      'product_detail_id',
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
      return { [key]: this.refs.applicant_form.refs.form[key].value }
    })
    const payload = Object.assign({}, ...arr)
    return submitDashboardForm('edit', 'line_items', applicant.id, payload)
  }
  componentDidMount() {
    const { params, getDashboardForm, getAllProducts } = this.props
    getDashboardForm(params.type, 'line_items', params.id).
      then(() => getAllProducts())
  }
  render() {
    const { applicant, products, submitDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-xs-12'>
          <h3>報名資訊</h3>
          {
            Object.keys(products).length != 0
            ? 
              <div className='applicant-form'>
                <ApplicantForm ref='applicant_form' 
                               key={applicant.id}
                               type='edit'
                               products={products}
                               showDeleteBtn={false} 
                               applicant={applicant} />
              </div>
            : <div/>
          }
            <label>來源</label><br/>
            {applicant.order_id ? '訂單' : '購物車'}
            <br/>
            <br/>
            <label>狀態</label><br/>
            {
              applicant.order_id 
                      ? applicant.is_paid ? '已付款' : '未付款'
                      : '-'
            }
            <br/>
            <br/>
            <input type='submit'
                   value='確定'
                   className='btn btn-success btn-block'
                   onClick={() => this.submitApplicant().
                                    then(() => browserHistory.push('/dashboard/applicants')).
                                    then( null, err => console.log(err) )} />
        </div>
      </div>
    )
  }
}

DashboardApplicantForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  return {
    applicant: state.dashboard.form,
    products: state.products.byId
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm, getAllProducts }
)(DashboardApplicantForm)
