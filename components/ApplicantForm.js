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
        product_name = <select className='applicant-form-dropdown' name='product_id' defaultValue={applicant.product_id} disabled={disabled}>
                         { Object.keys(products).map(id => 
                             <option key={id} value={id}>{products[id].name}</option>
                         )}
                       </select>
        delette_btn = <input type='submit' className='btn btn-danger btn-xs pull-right' onClick={() => onDelete('line_items', applicant.id).then(() => onDeleteCallback())} value='刪除' />
        break
      case 'show':
        disabled = 'disabled'
        product_name = applicant.product_name
        delette_btn = <div/>
        break
    }

    return (
      <div className='row'>
        <div className='col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 applicant-form'>
          { delette_btn }
          <div style={{ clear: 'both' }} />
          <form ref='form'>
            <div className='col-xs-6'>
              <h6 className='applicant-form-label'>報名營隊<span style={{color: 'red'}}>*</span></h6>
              { product_name }
              <h6 className='applicant-form-label'>姓名<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='text' name='name' defaultValue={applicant.name} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>生日<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='date' name='birth' defaultValue={applicant.birth} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>學校<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='text' name='school' defaultValue={applicant.school} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>年級<span style={{color: 'red'}}>*</span></h6>
              <select name='grade' defaultValue={applicant.grade} disabled={disabled}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
              <h6 className='applicant-form-label'>飲食需求<span style={{color: 'red'}}>*</span></h6>
              <select name='food_preference' defaultValue={applicant.food_preference} disabled={disabled}>
                <option value='normal'>正常</option>
                <option value='veggie'>素食</option>
                <option value='no_beef'>不吃牛肉</option>
                <option value='other'>其他</option>
              </select>
            </div>
            <div className='col-xs-6'>
              <h6 className='applicant-form-label'>性別<span style={{color: 'red'}}>*</span></h6>
              <select name='gender' defaultValue={applicant.gender} disabled={disabled}>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              <h6 className='applicant-form-label'>身分證字號<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='text' name='ss_number' defaultValue={applicant.ss_number} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>家長電話<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='text' name='parent_phone_number' defaultValue={applicant.parent_phone_number} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>家長電子信箱<span style={{color: 'red'}}>*</span></h6>
              <input className='applicant-form-input' type='text' name='parent_email' defaultValue={applicant.parent_email} disabled={disabled} /><br/>
              <h6 className='applicant-form-label'>備註</h6>
              <input className='applicant-form-input' type='textarea' name='note' defaultValue={applicant.note} disabled={disabled} />
            </div>
            <div style={{ clear: 'both' }} />
          </form>
        </div>
      </div>
    )
  }
}
