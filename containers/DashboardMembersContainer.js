import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDashboardList, deleteDashboardForm } from '../actions/dashboard'
import { Table } from 'react-bootstrap'

class DashboardMembersContainer extends Component {
  componentDidMount() {
    this.props.getDashboardList('members')
  }
  render() {
    const { members, deleteDashboardForm } = this.props
    return (
      <div className='container-fluid'>
        <div className='col-md-12 col-xs-12'>
          <h3>會員</h3>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>編號</th>
                <th>姓名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { members.map(member => 
                <tr key={member.id}>
                  <td>
                    <Link to={`${this.props.route.path}/edit/${member.id}`}>
                      {member.id}
                    </Link>
                  </td>
                  <td>{member.name}</td>
                  <td><a className='btn btn-danger btn-sm' onClick={() => deleteDashboardForm('members', member.id) }>刪除</a></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

DashboardMembersContainer.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  getDashboardList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    members: state.dashboard.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getDashboardList, deleteDashboardForm }
)(DashboardMembersContainer)
