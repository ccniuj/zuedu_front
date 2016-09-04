import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { member: 700, n1: 0, n2: 0, year: 0 }
    this.countToNumber = (numbers, duration) => this._countToNumber(numbers, duration)
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
    $(this.refs.numbers).fadeIn(1500)
    $(this.refs.features).fadeIn(1500)
    this.countToNumber({member: 1000, n1: 300, n2: 50, year: 5}, 500)
  }
  _countToNumber(numbers, duration) {
    let ds = {}
    for (let key in numbers) {
      ds[key] = Math.ceil(duration/numbers[key])
    }
    for(let key in ds) { 
      let i = setInterval(() => {
                this.setState({ [key]: this.state[key]+1 })
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
    return (
      <div className='container-fluid' style={style}>
        <div className='row'>
          <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            {
            // <ol className="carousel-indicators">
            //   <li data-target="#carousel-example-generic" data-slide-to={0} className="active" />
            //   <li data-target="#carousel-example-generic" data-slide-to={1} />
            //   <li data-target="#carousel-example-generic" data-slide-to={2} />
            // </ol>
            }
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <img src="/images/landing.png" alt="..." />
                <div className="carousel-caption">
                  <h1>ZU築優教育</h1>
                  <h1>首創整合教學</h1>
                  <h2>程式 x 電路 x 3D繪圖 x 實驗</h2>
                </div>
              </div>
            </div>
            {/* Controls */}
            {
            // <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            //   <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
            //   <span className="sr-only">Previous</span>
            // </a>
            // <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            //   <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
            //   <span className="sr-only">Next</span>
            // </a>
            }
          </div>
        </div>
        <div className='row text-center home-numbers-container'>
          <div ref='numbers' style={{ display: 'none' }}>
            <div className='col-xs-3 home-number'>
              <span>{this.state.member}</span>
              <span>學員</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n1}</span>
              <span>數字1</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n2}</span>
              <span>數字2</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.year}</span>
              <span>年營隊經驗</span>
              <img src='/images/icon_wreath.png' />
            </div>
          </div>
        </div>
        <div className='row home-features-container'>
          <div ref='features' style={{ display: 'none' }}>
            <center><h2>ZU教學 三大特色</h2></center>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='/images/feature_left.png' />
              </div>
              <center><h4>ZUBOX</h4></center>
            </div>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='/images/feature_middle.png' />
              </div>
              <center><h4>圖像思考</h4></center>
            </div>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='/images/feature_right.png' />
              </div>
              <center><h4>沈浸教學</h4></center>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
}

function mapStateToProps(state) {
  return {
    serverRender: state.serverRender
  }
}

export default connect(mapStateToProps, { clientRender })(Home)
