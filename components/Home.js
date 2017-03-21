import React, {
  Component,
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import {
  clientRender
} from '../actions'
import Slider from 'react-slick'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n1: 0,
      n2: 0,
      n3: 0,
      n4: 0
    }
    this.countToNumber = (numbers, duration) => this._countToNumber(numbers, duration)
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
    $(this.refs.numbers).fadeIn(500)
    $(this.refs.features).fadeIn(1500)
    this.countToNumber({
      n1: 300,
      n2: 9,
      n3: 5,
      n4: 2
    }, 500)
  }
  _countToNumber(numbers, duration) {
    let ds = {}
    for (let key in numbers) {
      ds[key] = Math.ceil(duration / numbers[key])
    }
    for (let key in ds) {
      let i = setInterval(() => {
        this.setState({
          [key]: this.state[key] + 1
        })
        if (this.state[key] >= numbers[key]) {
          clearInterval(i)
        }
      }, ds[key])
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px'
    }
    var settings = {
      dots: true,
      arrows:false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      
    };
    return (

      <div className='container-fluid' style={style}>
        <div className='row'>
        <div className="col-md-12  pic-slider" >
          <Slider {...settings}>
            <div><img src="/images/pic2.png" alt=""/></div>
            <div><img src="/images/pic2.png" alt=""/></div>
          </Slider>          
        </div>
        </div>
        <img src="/images/yellow-radius.png" style={{width:"100%",zIndex:3}} alt=""/>
        <div className="home-blocks col-xs-12">
          <div className="col-xs-10 col-xs-offset-1  home-pic" >
            <div className ="row home-pic">
              <div className= "col-xs-4  home-block">
                <div className="home-block-detail">
                <img src="/images/PIC21.png" alt=""/>
                <h1 className="col-xs-10 col-xs-offset-1">ZUBOX</h1>
                <p>
                  
                </p>
                </div>
              </div>
              <div className= "col-xs-4  home-block">
                <div className="home-block-detail">
                  <img src="/images/PIC22.png" alt=""/>
                   <h1 className="col-xs-10 col-xs-offset-1">圖像式思考</h1>
                  <p>
                  
                  </p>
                </div>
              </div>
              <div className= "col-xs-4  home-block">
                <div className="home-block-detail">
                  <img src="/images/PIC23.png" alt=""/>
                   <h1 className="col-xs-10 col-xs-offset-1">沈浸式教學</h1>
                  <p>
                  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          /*
        <div className='row text-center home-numbers-container'>
          <div className="col-md-12"ref='numbers' style={{ display: 'none' }}>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n1}+</span>
              <span>學員</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n2}成</span>
              <span>學生滿意度</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n3}年</span>
              <span>營隊經驗</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n4}門</span>
              <span>主題課程</span>
              <img src='/images/icon_wreath.png' />
            </div>
          </div>
        </div>
          */
        }
        <div className="home-product">
          <div className="row home-product-block">
            <h1 className="left">dwaaewdaw</h1>
            <div className="col-xs-8 home-product-detail">
              <div className="header-polgan-left"><h1 className="left">jiewjoidj</h1></div>
            </div>
            <img className="col-xs-4" src="/images/pic5.png" alt=""/>
          </div>
          <div className="row product-block ">
          <h1 className="right">dwaaewdaw</h1>
            <img className="col-xs-4" src="/images/pic6.png" alt=""/>
            <div className="col-xs-8 home-product-detail">
              <div className="header-polgan-right "><h1 className="right">jiewjoidj</h1></div>
            </div>
            
          </div>
        </div>

      </div>
    )
  }
}

Home.propTypes = {}

function mapStateToProps(state) {
  return {
    serverRender: state.serverRender
  }
}

export default connect(mapStateToProps, {
  clientRender
})(Home)