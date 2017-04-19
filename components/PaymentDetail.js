import React, { Component } from 'react';
import { connect } from 'react-redux'
import { submitForm} from '../actions'
const allAttrs={
	PaymentType:"付款方式",
	BankCode:"轉帳銀行分行代碼",
	PayAmt:"應付金額",
	RedeemAmt:"交易是否完成",
	vAccount:"轉帳帳號",
	TradeNo:"交易序號"
}

class PaymentDetail extends Component {
	constructor(){
		super()
		this.state={
			attrs:[]

		}
	}
	componentDidMount(){
		console.log(this.props)
	}
  componentWillReceiveProps(nextContext) {
    const params = Object.assign({},nextContext.transaction[0].params) 
    switch(params.PaymentType.split("_")[0]){
    	case "ATM":
    	console.log("atm")
    		this.setState({attrs:['PaymentType','BankCode','PayAmt','RedeemAmt','vAccount','TradeNo']})
    		break;
    	case "CVS":
    		break;
    	default:
    	break;
    }
    console.log(params)
    Object.keys(params).map((key) => {
    	console.log(key)
   		if(allAttrs[key]!==undefined){
   			
   			this.refs[key].value = params[key]
   		}
    }
    )
  }
	render() {

		return (
			<div>
				{
					Object.keys(allAttrs).map((key) =>{
						console.log(key)
						return(<div key={key}>
									<label htmlFor={key}>{allAttrs[key]}</label>
									<input className='col-xs-6 orderinfo-form-input' name={key} ref={key} />
								</div> )
					}
					)
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    transaction: state.orders.form.transactions
  }
}

export default connect(
  mapStateToProps,
  {submitForm}
)(PaymentDetail)