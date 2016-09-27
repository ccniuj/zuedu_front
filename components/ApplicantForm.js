import React, { Component } from 'react'

export default class ApplicantForm extends Component {
  constructor(props) {
    super(props)
    this.state = { product_id: this.props.applicant.product_id }
    this.onProductIdChange = event => this._onProductIdChange(event)
  }
  _onProductIdChange(e) {
    this.setState({ product_id: e.target.value })
  }
  componentWillReceiveProps(nextProps) {
    let attributes = [
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
    if (nextProps.type == 'edit') {
      attributes.push('product_id', 'product_detail_id')
    }
    attributes.map( col => {
      this.refs[col].value = nextProps.applicant[col]
    })
  }
  render() {
    const { type, products, applicant, onDelete, onDeleteCallback, showDeleteBtn } = this.props
    let disabled
    let product_name
    let product_detail
    let delette_btn

    switch (type) {
      case 'edit':
        disabled = ''
        product_name = <select ref='product_id' className='applicant-form-dropdown' name='product_id' defaultValue={applicant.product_id} disabled={disabled} onChange={this.onProductIdChange}>
                         { Object.keys(products).map(id => 
                             <option key={id} value={id}>{products[id].name}</option>
                         )}
                       </select>
        product_detail = <select ref='product_detail_id' className='applicant-form-dropdown' name='product_detail_id' defaultValue={applicant.product_detail_id} disabled={disabled}>
                           { products[this.state.product_id].product_details.map(pd => 
                               <option key={pd.id} value={pd.id}>{pd.description}</option>
                           )}
                         </select>
        delette_btn = showDeleteBtn ? <input type='submit' className='btn btn-danger btn-xs pull-right' onClick={() => onDelete('line_items', applicant.id).then(() => onDeleteCallback())} value='刪除' /> : <div/>
        break
      case 'show':
        disabled = 'disabled'
        product_name = applicant.product_name
        product_detail = applicant.product_detail_description
        delette_btn = <div/>
        break
    }

    return (
      <div>
        { delette_btn }
        <div style={{ clear: 'both' }} />
        <form ref='form'>
          <div className='col-xs-6'>
            <h6 className='applicant-form-label'>報名營隊<span style={{color: 'red'}}>*</span></h6>
            { product_name }
            <div className='applicant-form-dropdown-margin' />
            <h6 className='applicant-form-label'>報名場次<span style={{color: 'red'}}>*</span></h6>
            { product_detail }
            <div className='applicant-form-dropdown-margin' />
            <h6 className='applicant-form-label'>姓名<span style={{color: 'red'}}>*</span></h6>
            <input ref='name' className='applicant-form-input' type='text' name='name' defaultValue={applicant.name} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>生日<span style={{color: 'red'}}>*</span></h6>
            <input ref='birth' className='applicant-form-input' type='date' name='birth' defaultValue={applicant.birth} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>學校<span style={{color: 'red'}}>*</span></h6>
            <input ref='school' className='applicant-form-input' type='text' name='school' defaultValue={applicant.school} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>年級<span style={{color: 'red'}}>*</span></h6>
            <select ref='grade' className='applicant-form-dropdown' name='grade' defaultValue={applicant.grade} disabled={disabled}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>
          <div className='col-xs-6'>
            <h6 className='applicant-form-label'>性別<span style={{color: 'red'}}>*</span></h6>
            <select ref='gender' className='applicant-form-dropdown' name='gender' defaultValue={applicant.gender} disabled={disabled}>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            <div className='applicant-form-dropdown-margin' />
            <h6 className='applicant-form-label'>身分證字號<span style={{color: 'red'}}>*</span></h6>
            <input ref='ss_number' className='applicant-form-input' type='text' name='ss_number' defaultValue={applicant.ss_number} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>家長電話<span style={{color: 'red'}}>*</span></h6>
            <input ref='parent_phone_number' className='applicant-form-input' type='text' name='parent_phone_number' defaultValue={applicant.parent_phone_number} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>家長電子信箱<span style={{color: 'red'}}>*</span></h6>
            <input ref='parent_email' className='applicant-form-input' type='text' name='parent_email' defaultValue={applicant.parent_email} disabled={disabled} /><br/>
            <h6 className='applicant-form-label'>備註</h6>
            <input ref='note' className='applicant-form-input' type='textarea' name='note' defaultValue={applicant.note} disabled={disabled} />
            <h6 className='applicant-form-label'>飲食需求<span style={{color: 'red'}}>*</span></h6>
            <select ref='food_preference' className='applicant-form-dropdown' name='food_preference' defaultValue={applicant.food_preference} disabled={disabled}>
              <option value='normal'>正常</option>
              <option value='veggie'>素食</option>
              <option value='no_beef'>不吃牛肉</option>
              <option value='other'>其他</option>
            </select>
            <div className='applicant-form-dropdown-margin' />
          </div>
          <div style={{ clear: 'both' }} />
        </form>
      </div>
    )
  }
}
