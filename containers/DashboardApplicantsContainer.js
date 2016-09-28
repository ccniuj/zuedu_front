import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm, download_csv } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardApplicantsContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('line_items')
  }
  renderCheckboxes() {
    let cols = {
      id: '報名編號',
      product_id: '課程',
      product_detail_id: '場次',
      cart_id: '購物車編號',
      order_id: '訂單編號',
      unit_price: '報名價格',
      name: '姓名',
      birth: '生日',
      gender: '性別',
      ss_number: '身分證字號',
      school: '學校',
      grade: '年級',
      parent_phone_number: '家長電話',
      parent_email: '家長電子信箱',
      food_preference: '飲食需求',
      note: '備註',
      created_at: '建立日期',
      updated_at: '更新日期'
    }
    return Object.keys(cols).map(key => <div className='col-xs-4' key={key}><input ref={`${key}`} type='checkbox' defaultChecked />&nbsp;{cols[key]}&nbsp;&nbsp;</div>)
  }
  render() {
    const { applicants, getDashboardList, deleteDashboardForm, download_csv } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>報名資料</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>性別</th>
                <th>課程</th>
                <th>場次</th>
                <th>來源</th>
                <th>狀態</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { applicants.map(applicant => 
                <tr key={applicant.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${applicant.id}`}>
                      {applicant.id}
                    </Link>
                  </td>
                  <td>{applicant.name}</td>
                  <td>{applicant.gender_t}</td>
                  <td>{applicant.product_name}</td>
                  <td>{applicant.product_detail_description}</td>
                  <td>{applicant.order_id ? '訂單' : '購物車'}</td>
                  <td>
                    {
                      applicant.order_id 
                      ? applicant.is_paid ? '已付款' : '未付款'
                      : '-'
                    }</td>
                  <td><a className='btn btn-danger btn-sm' 
                         onClick={
                           () => deleteDashboardForm('line_items', applicant.id).
                             then(() => getDashboardList('line_items'))
                         }>刪除</a></td>
                </tr>
              )}
            </tbody>
          </Table>
          <h3>表單欄位</h3>
          { this.renderCheckboxes() }
          <div style={{ clear: 'both' }} /><br/>
          <input className='btn btn-success' type='submit' value='匯出表單'
                 onClick={
                   () => download_csv('line_items', Object.keys(this.refs).filter(r => this.refs[r].checked)).
                     then(data => {
                       let a = document.createElement('a')
                       a.href = `data:attachment/csv,${encodeURI(data.csv)}`
                       a.target = '_blank'
                       a.download = 'line_items.csv'
                       document.body.appendChild(a)
                       a.click()
                     })
                 } />
        </div>
      </div>
    )
  }
}

DashboardApplicantsContainer.propTypes = {
  applicants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    applicants: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm, download_csv }
)(DashboardApplicantsContainer)
