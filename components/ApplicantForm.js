import React, { Component } from 'react'

export default class ApplicantForm extends Component {
  render() {
    const { type, products, applicant, onDelete, onDeleteCallback } = this.props
    let disabled
    let product_name
    let delette_btn
    switch (type) {
      case 'edit':
        disabled = ''
        product_name = <select name='product_id' defaultValue={applicant.product_id} disabled={disabled}>
                         { Object.keys(products).map(id => 
                             <option key={id} value={id}>{products[id].name}</option>
                         )}
                       </select>
        delette_btn = <input type='submit' className='btn btn-danger' onClick={() => onDelete('line_items', applicant.id).then(() => onDeleteCallback())} value='刪除' />
        break
      case 'show':
        disabled = 'disabled'
        product_name = applicant.product_name
        delette_btn = <div/>
        break
    }

    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3 applicant-form'>
          <form ref='form'>
            課程名稱：
            { product_name }
            <br/>
            姓名：
            <input type='text' name='name' defaultValue={applicant.name} disabled={disabled} /><br/>
            生日：
            <input type='date' name='birth' defaultValue={applicant.birth} disabled={disabled} /><br/>
            性別：
            <select name='gender' defaultValue={applicant.gender} disabled={disabled}>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            <br/>
            身分證字號：
            <input type='text' name='ss_number' defaultValue={applicant.ss_number} disabled={disabled} /><br/>
            學校：
            <input type='text' name='school' defaultValue={applicant.school} disabled={disabled} /><br/>
            年級：
            <select name='grade' defaultValue={applicant.grade} disabled={disabled}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
            <br/>
            飲食需求：
            <select name='food_preference' defaultValue={applicant.food_preference} disabled={disabled}>
              <option value='normal'>正常</option>
              <option value='veggie'>素食</option>
              <option value='no_beef'>不吃牛肉</option>
              <option value='other'>其他</option>
            </select>
            <br/>
            備註：
            <input type='textarea' name='note' defaultValue={applicant.note} disabled={disabled} />
            <br/>
          </form>
          { delette_btn }
        </div>
      </div>
    )
  }
}
