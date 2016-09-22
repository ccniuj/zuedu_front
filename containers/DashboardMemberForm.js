import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getDashboardForm, submitDashboardForm } from '../actions/dashboard'

class DashboardMemberForm extends Component {
  componentDidMount() {
    const { params, getDashboardForm } = this.props
    this.props.getDashboardForm(params.type, 'members', params.id)
  }
  componentWillReceiveProps(nextProps) {
    const { name, email, avatar, inventory } = nextProps.member
    this.refs.name.value = name
    this.refs.email.value = email
    this.refs.avatar.src = avatar
  }
  render() {
    const { member, submitDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-9 col-xs-9'>
          <h3>會員</h3>
          <form onSubmit={ e => {
                e.preventDefault()
                submitDashboardForm(member.type, 'members', member.id, {
                  name: this.refs.name.value,
                  email: this.refs.email.value
                }).then(() => browserHistory.push('/dashboard/members'))
              }}
            >
            <label htmlFor='id'>編號</label><br/>
            {member.id}
            <br/>
            <br/>
            <label htmlFor='name'>名稱</label>
            <input ref='name' type='text' name='name' placeholder='輸入名稱' style={{width: '100%'}} devalue={member.name} />
            <br/>
            <br/>
            <label htmlFor='email'>電子郵件</label>
            <input ref='email' type='text' name='email' placeholder='輸入電子郵件' style={{width: '100%'}} defaultValue={member.email} />
            <br/>
            <br/>
            <label htmlFor='avatar'>頭像</label>
            <img ref='avatar' src={member.avatar} />
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

DashboardMemberForm.propTypes = {
  dashboard: PropTypes.shape({
    form: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  })
}

function mapStateToProps(state) {
  return {
    member: state.dashboard.form
  }
}

export default connect(
  mapStateToProps,
  { getDashboardForm, submitDashboardForm }
)(DashboardMemberForm)
