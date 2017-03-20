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
        <div class="fb-page" 
          data-href="https://www.facebook.com/facebook"
          data-width="380" 
          data-hide-cover="false"
          data-show-facepile="false" 
          data-show-posts="false">
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