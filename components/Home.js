import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

export default class Home extends Component {
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
            <ol className="carousel-indicators">
              <li data-target="#carousel-example-generic" data-slide-to={0} className="active" />
              <li data-target="#carousel-example-generic" data-slide-to={1} />
              <li data-target="#carousel-example-generic" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <img src="https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/13112981_1706155963001405_7548779658806243038_o.jpg" alt="..." />
                <div className="carousel-caption">
                  <h3>ZU創意教學</h3>
                </div>
              </div>
              <div className="item">
                <img src="https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12240353_1640340669582935_61700781934000110_o.png" alt="..." />
                <div className="carousel-caption">
                  <h3>ZU創意教學</h3>
                </div>
              </div>
              <div className="item">
                <img src="https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/12303921_1643137342636601_8917072545562626113_o.jpg" alt="..." />
                <div className="carousel-caption">
                  <h3>ZU創意教學</h3>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className='row text-center home-numbers-container'>
          <div ref='numbers' style={{ display: 'none' }}>
            <div className='col-xs-3'>
              <h1>{this.state.member}</h1>
              <h3>學員</h3>
            </div>
            <div className='col-xs-3'>
              <h1>{this.state.n1}</h1>
              <h3>數字1</h3>
            </div>
            <div className='col-xs-3'>
              <h1>{this.state.n2}</h1>
              <h3>數字2</h3>
            </div>
            <div className='col-xs-3'>
              <h1>{this.state.year}</h1>
              <h3>年營隊經驗</h3>
            </div>
          </div>
        </div>
        <div className='row home-features-container'>
          <div ref='features' style={{ display: 'none' }}>
            <center><h2>三大特色</h2></center>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/13925626_1744064692543865_3001181317949238363_o.jpg' />
              </div>
              <center><h4>ZUBOX</h4></center>
            </div>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/13653258_1744695019147499_8304026447925702789_o.jpg' />
              </div>
              <center><h4>圖像思考</h4></center>
            </div>
            <div className='col-xs-4'>
              <div className='home-feature'>
                <img src='https://scontent-tpe1-1.xx.fbcdn.net/t31.0-8/13913612_1743134102636924_4870047607245446251_o.jpg' />
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
