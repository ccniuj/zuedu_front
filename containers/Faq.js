import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clientRender } from '../actions'

class Faq extends Component {
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    return (
      <div className='container' style={style}>
        <center><h3>常見問題</h3></center>
        <h4>
          Q: 請問程式設計的內容看起來怎麼好像比重不大呢？程式教育不是目前全球的學習趨勢嗎？
        </h4>
        <p>
          A: 在這世界上一流的程式設計人才價值是在於他們的“設計”以及“邏輯”，ZU創造力課程在程式的撰寫工具操作上著磨不多，我們將課程時間傾注在邏輯思維的養成以及創造力的培養！我們相信這才會是未來最有價值的能力！
        </p>
        <br/>
        <h4>
          Q: 請問創造力課程的課程內容是如何安排出來的呢？我家小朋友在上完課程過後會獲得什麼呢？
        </h4>
        <p>
          A: ZU創造力課程是依循著以人為本，以學員為中心所籌劃出的課程。我們希望讓學員獲得邏輯思考能力、動手實作能力、美學設計思維以及程式設計能力，學員們在短短四天，透過活動以及授課，將能一一體驗並瞭解各項能力的核心概念。
        </p>
        <br/>
        <h4>
          Q: 我很喜歡你們安排的課程，但在美感美學這個部分有些疑問，在學校美術課常常都拿來被其他老師補課，那我來這邊參加課程學美學設計對我的小朋友有任何用處嗎？
        </h4>
        <p>
          A: 美學設計這個部分在台灣的正式教育上的確常常被忽略，但這個部分卻是大大的影響一個人未來職涯的價值及發展。舉例來說，在手機的市場上 HTC 以及 APPLE 明明在功能上差不多，但售價以及忠實用戶卻差了一大截，這就是因為 APPLE 將美學的思維完整導入產品中，始使用者在使用時潛移默化的愛上他給的體驗，這就是美學的價值。
        </p>
        <br/>
        <h4>
          Q: 對於你們的課程安排我覺得很棒，請問課程上課方式為何ㄋ呢？一至六年級混齡上課程度會不會落差太大？
        </h4>
        <p>
          A: 我們會將學員分為兩個班級（一至三年級以及四至六年級），每個班級只招收36位學員，並且會進行分組，由5~6人組成一組並由專任助教引導上課。
        </p>
        <br/>
        <h4>
          Q: 請問我該怎麼報名這個課程呢？
        </h4>
        <p>
          A: 請您直接到我們的網站課程頁面中點選報名就行囉！一切的報名流程以及付款方式都會在 ZU 官網上完成喔！
        </p>
        <br/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    serverRender: state.serverRender
  }
}
export default connect(mapStateToProps, { clientRender })(Faq)
