import _ from 'lodash';
import React, {
  Component,
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Link,
  browserHistory
} from 'react-router'
import {
  addToCart,
  submitForm,
  deleteForm,
  getAllProducts,
  getCart,
  clientRender,
  step
} from '../actions'
import {
  getCartProducts
} from '../reducers'
import Cart from '../components/Cart'
import CartInfo from '../components/CartInfo'
import ApplicantForm from '../components/ApplicantForm'
import OrderStep from '../components/OrderStep'
import OrdersFormNew from './OrdersFormNew'
class CartContainer extends Component {
  static fetchData({
    store,
    cookie
  }) {
    return store.dispatch(getAllProducts(cookie)).
    then(() => store.dispatch(getCart(cookie)))
  }
  constructor(props) {
    super(props)
    this.submitApplicants = () => this._submitApplicants()
    this.renderCart = () => this._renderCart()
    this.lastStep=()=>this._lastStep()
    this.nextStep=()=>this._nextStep()

    this.state={
      progress:1,
      style:{display:"block"},
      detail:{
        nextBottom:"確認",
        lastBottom:""
      }
    }
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getAllProducts().
      then(() => this.props.getCart())
    }
  }
  _submitApplicants() {
    const {
      applicants,
      submitForm,
      getCart
    } = this.props
    const submits = applicants.map(applicant => {
      let attributes = [
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
      let arr = attributes.map(key => {
        console.log(key)
        return {
          [key]: this.refs[`applicant_${applicant.id}`].refs.form[key].value
          //KEY : (ref = [`applicant_${applicant.id}`] 的原件)裡的(ref=form的?????)的value
        }
      })
      const payload = Object.assign({}, ...arr)
      return submitForm('edit', 'line_items', applicant.id, payload)
    })
    return Promise.all(submits).then(() => getCart(), err => Promise.reject(err))
  }
  _nextStep(){
      
      console.log(this.state.progress);
      let detail = Object.assign({},this.state.detail);
      if (this.state.progress==1){
        this.submitApplicants().then(()=>{
          
          detail={nextBottom:"確認無誤並結帳",lastBottom:"回上一步"}
          this.setState({detail});
          this.setState({progress:this.state.progress+1});
          this.setState({style:{display:"none"}});
        }
        , err => console.log(err));
       
      }
      else if (this.state.progress==2){
        this.submitApplicants().then(() =>{
        this.setState({style:{display:"none"}});
        this.setState({detail});
        this.setState({progress:this.state.progress+1});
        detail={nextBottom:"付款",lastBottom:"回上一步"};
        browserHistory.push('/cart/new')
        }
        , err => console.log(err));
        
      }

      
      console.log(this.state.progress);
    }
  _lastStep(){
      console.log(this.state.progress);
      
      let detail = Object.assign({},this.state.detail);

      if (this.state.progress==2){
        detail={nextBottom:"確認",lastBottom:""}
        this.setState({detail});
        this.setState({progress:this.state.progress-1});
        this.setState({style:{display:"block"}});
      }
      else if (this.state.progress==3){
        detail={nextBottom:"確認無誤並結帳",lastBottom:"回上一步"}
        this.setState({detail});
        this.setState({progress:this.state.progress-1});
        this.setState({style:{display:"none"}});
      }

      console.log(this.state.progress);
    }
    _plusItem(products,time = 0){

          defaultProductId = parseInt(Object.keys(products)[0])
    
    }
    //尚未把有兩個場次的情況考慮進去
  render() {
    const {
      products,
      applicants,
      addToCart,
      deleteForm,
      getCart,
      cart_matchable_discount_name,
      cart_matchable_discount_factor,
      total
    } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const hasProducts = applicants.length > 0
    let defaultProductId = parseInt(Object.keys(products)[0])
    //
    return (
      <div className='container' style={style}>
        
        <center><h3>購物車</h3></center>
        <div className='row'>
        <div className = "col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1" 
        style={{
          padding:'0',
          paddingTop:'20px',
          paddingBottom:'20px',
        }}
        >
        <OrderStep progress={this.state.progress} />
        </div>
        </div>
        
        {
          this.state.progress == 1?

          (
            <div>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 cart-btns applicant-form'>
                <h4 className="font-style">團報規範</h4>
                <p className="font-style"style={{color:'white',fontWeight:'900',
              }}>
                  提醒您，"團報" 分為 "單人團報" & "多人團報"<br/>
                  "單人團報"指一人參加2個(含)以上的營隊即算團報！<br/>
                  "多人團報" 請指定一人 "代表"，蒐集所有人的資料，屆時直接由團報代表 "統一填寫表單" & "付款"！<br/>
                  "多人團報" 中的人員若有人因故缺席，臨時辦理取消報名，請找人遞補，並提供遞補者的資料給我們。<br/>
                  提醒您，若無法找到人遞補，且團報因此少於2人，不符合團報人數(2人[含]以上)，則扣除退款差額與手續費後，退還給取消報名者。<br/>
                  (ex: A 與 B 2人團報銀河之旅，6400/人，若B臨時退出，A即不符合團報標準，A的票價變為 7200/人，則退給B 6400-800=5600，並扣除人工手續費 10%，最後會退還 5040 給B)
                </p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 cart-btns applicant-form'>
                <ul>
                  <li>請輸入學生及聯絡人資料，並選擇這位學生要參加的梯次。</li>
                  <li>若要團報，請先填寫一位學生的資料，點選 
                    <span className="glyphicon glyphicon-plus cart-add-btn " aria-hidden="true"
                      style = {
                        {
                          marginLeft:'0.5em',
                          marginRight:'0.5em',
                          padding:'0 0 0.03em 0.035em',
                          border: '0.025em solid white',
                          fontSize:'1em',
                          color:'white',
                        }
                      }
                    />
                 按鈕；再填寫另一位學生的資料。</li>
                </ul>
              </div>
            </div>
            </div>
          ):<div/>
        }
        {
          this.state.progress == 3 ? this.props.children :<div/>
        }
        {
          this.state.progress == 2 ?
          (applicants.length > 0
                    ? 
                    <div className = 'row'>
                    <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 applicant-form'>
                    <CartInfo applicants={applicants} 
                                cart_matchable_discount_name={cart_matchable_discount_name}
                                cart_matchable_discount_factor={cart_matchable_discount_factor}
                                total={total} />
                    </div>
                    </div>
                    : <div/>)
          :<div/>
        }
        
        { 
          applicants.map(applicant => 
                      <div key={applicant.id} className='row' style={this.state.style}>
                        <div  className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 applicant-form'>
                          <ApplicantForm ref={`applicant_${applicant.id}`} 
                                         type='edit'
                                         products={products} 
                                         applicant={applicant}
                                         showDeleteBtn={true}
                                         onDelete={deleteForm}
                                         onDeleteCallback={getCart} />
                        </div>
                        </div>
          )
        }
        
        <div className = 'row'>
        <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 cart-add-btn' style={
          {
            marginTop:'10px',
            marginBottom:'10px'
          }
        }>
        <div className = 'row'>
        <button
        className="col-md-12 col-xs-12"
        style={
          {

            margin:'0',
            border:'0',
          }
        }
        onClick={
          ()=>{
          this.submitApplicants().then(()=>{addToCart(defaultProductId,products[defaultProductId].product_details[0].id).
                              then(() => getCart(), err => {
                                console.log(err)
                              })},null)
        }
        } >
        <div className='row'>
          <div className="col-md-12 col-xs-12 cart-add-btn">
          <div className='row'>
            <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
              <span className="glyphicon glyphicon-plus cart-add-btn " aria-hidden="true"
              style = {
                {
                  margin: '0',
                  padding:'0 0 0.06em 0.07em',
                  border: '0.05em solid white',
                  fontSize:'2em',
                  color:'white',
                }
              }></span>
            </div> 
            </div>
          </div>
          </div>
        </button>
        </div>
        </div>
        </div>
        <div className = 'row' style={{marginBottom:'10px'}}>
          <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
            <div className='row'>
              <button type="button" className="col-md-4 col-md-offset-0 col-xs-4 cart-next-btn"
              onClick={this.lastStep}
              >{this.state.detail.lastBottom}</button>
              <button type="button" className="col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4 cart-next-btn"
              onClick={this.nextStep}
              >{this.state.detail.nextBottom}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CartContainer.propTypes = {
  applicants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired
}

const mapStateToProps = state => {
  return {
    products: state.products.byId,
    total: state.cart.form.price,
    applicants: state.cart.form.line_items,
    cart_matchable_discount_name: state.cart.form.matchable_discount_name,
    cart_matchable_discount_factor: state.cart.form.matchable_discount_factor,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps, {
    getAllProducts,
    submitForm,
    deleteForm,
    getCart,
    clientRender,
    addToCart
  }
)(CartContainer)