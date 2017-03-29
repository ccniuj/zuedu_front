import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

class About extends Component {
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
  }
  render() {
    const style = {
      paddingTop: '30px',

      minHeight: '600px'
    }
    return (
      <div className='container-fluid' style={style}>
        <div className='row' >
          <img src='/images/about_1.png' style={{width: '100%'}} />
          <div className="about-view col-md-5 col-md-offset-1 col-xs-10 col-xs-offset-1">
            <h1>我們的願景</h1>
            <br/>
            <h4>隨著科技的發展，這個世界每一秒都在劇烈的改變，</h4>
            <h4>今日的明星產業可能是明日的國際失業。</h4>
            <h4>這個世代的孩子又該怎麼掌握自己的人生呢?</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-5' style={{marginTop: '30px', marginBottom: '30px'}}>
            <iframe width='100%' height='300px' src="https://www.youtube.com/embed/NQ9Se8bH6v4" frameBorder="0" allowFullScreen></iframe>
            <h5>台大葉丙成教授提出，現在的孩子最重要的不再是成績而是能夠擁有“快速學習、接受新事物與搜尋關鍵字”的能力!</h5>
          </div>
          <div className='col-xs-7' style={{marginTop: '30px', marginBottom: '30px'}}>
            <h3>巨變的世代，從何學起?</h3>
相較於從前，雖然現今的世代多彩萬變，卻也不再那麼黑白是非分明了。
這個世代猶如一片充滿珍寶卻未知的海域，無法預測何時會遇到一條價值不斐的大魚，也無法預測該用什麼工具去捕捉這些珍寶。與其替小孩擔心該給小孩什麼好的抓寶工具，不如讓小孩更早體驗到這片海域有多麼的有趣與珍貴，並從心開始的想要靠自己的能力打造專屬自己的抓寶工具! 
            <h3>三分之一的大學生後悔選擇的科系，遲來的抓週?</h3>
台灣著名高中、大學資訊整合平台[Urschool]曾經統計出每年全台的大學生有三分之一的人後悔自己選擇的科系，抓週這個活動不知不覺地晚了20年，即使真的抓到自己最愛的目標了又有多少人有勇氣再從“心”開始一次，人生又有多少個20年可以揮霍呢?
遲來的抓週，是否正是因為現在的教學太多都是虛無飄渺的理論，但這個理論到底會變成什麼工具，這是現在的小孩所體會不到的!如果有機會讓抓週提早個十年，提前透過動手做的教學了解自己的興趣所在 why not ?
讓潮流帶著孩子走，不如讓孩子的心帶著自己走!
          </div>
        </div>
        <div className='row' style={{position: 'relative'}}>
          <img src='/images/about_2.png' style={{width: '100%'}} />
          <div style={{position: 'absolute', top: '120px', left: '100px'}}>
            <h1>我們的目標</h1>
            <br/>
            <h4>協助孩子提早搜尋”內心關鍵字”，</h4>
            <h4>培養快速學習、接受新事物能力的</h4>
            <h4>下世代人才</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-10 col-xs-offset-1' style={{marginTop: '30px', marginBottom: '30px'}}>
          <h4>所有的ZU創意課程，不論是結合 MIT Scratch 以及科學實作教育的 Z-Create ，以及培養一流軟體思維的主題課程 Z-Code，目的都是把學生培養成有創造力以及提早發現內心關鍵字的一流人才。</h4>
          <br/>
          <h4 style={{color: '#7cc8d0'}}>富有創造力以及邏輯思維的軟體人才，能夠細膩的觀察周遭，發現人們的需求，提出並有能力完成實際的解決方法。</h4>
          <br/>
          <h4>創造力的培養並非一簇可及，需從小開始培養訓練。於創造力的課程，我們結合了與生活相關的科學實驗，引起孩子們的興趣並自發性的動手實作。再藉由遊戲的概念，結合培育邏輯思維的程式課程，一步一步的將孩子們內心的創造力以及軟體思維孕育而成。</h4>
          <br/>
          <h4>ZU創意教學團隊致力於為台灣培養出下個世代所需要的人才。</h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    serverRender: state.serverRender
  }
}
export default connect(mapStateToProps, { clientRender })(About)
