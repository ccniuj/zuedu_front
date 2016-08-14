import React, { Component } from 'react'

export default class ApplicantForm extends Component {
  render() {
    const { applicant } = this.props

    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3 applicant-form'>
          <form ref='form'>
            <center><h3>{ applicant.product_name }</h3></center>
            姓名：
            <input type='text' name='name' defaultValue={applicant.name} /><br/>
            生日：
            <input type='date' name='birth' defaultValue={applicant.birth} /><br/>
            性別：
            <select name='gender' defaultValue={applicant.gender}>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            <br/>
            身分證字號：
            <input type='text' name='ss_number' defaultValue={applicant.ss_number} /><br/>
            學校：
            <input type='text' name='school' defaultValue={applicant.school} /><br/>
            年級：
            <select name='grade' defaultValue={applicant.grade}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
            <br/>
            飲食需求：
            <select name='food_preference' defaultValue={applicant.food_preference}>
              <option value='normal'>正常</option>
              <option value='veggie'>素食</option>
              <option value='no_beef'>不吃牛肉</option>
              <option value='other'>其他</option>
            </select>
            <br/>
            備註：
            <input type='text' name='note' defaultValue={applicant.note} />
          </form>
        </div>
      </div>
    )
  }
}
