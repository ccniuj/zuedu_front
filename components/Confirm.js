import React, {
  Component,
  PropTypes
} from 'react'

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      submitDisable: true
    }
  }
  render() {
    const {
      addProducts
    } = this.props
    return (
      <div id="confirm" className="modal fade angle" role="dialog">
        <div className="modal-dialog angle">
          <div className="modal-content angle">
            <div className="modal-header gray angle">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h5 className="modal-title">貼心提醒：請使用 Google 瀏覽器，不要用IE瀏覽器進行報名，以確保您的權益。</h5>
            </div>
            <div className="modal-body">
              <h4>【注意事項】</h4>
              <ol>
                <li>
                  提醒您，若年齡不符合該營隊的建議年齡，則不建議參加，築優保有「主動取消」您名額的權利，且手續費10%由您自行負擔。
                </li>
                <li>
                  付款若未完成，72小時後會自動取消您的報名，提供名額給其他家長。
                </li>
                <li>
                  活動開始前1~2週，會寄送開課通知信，包含該營隊在哪一間教室上課、交通資訊...等，在此之前不會有其餘通知，請見諒。
                </li>
                <li>
                  如遇不可抗拒因素之突發事件或非可歸因於家長或學員之因素而被迫取消，主辦單位將另外通知家長安排其他時間補課。若家長無法配合補課時間則視同放棄，主辦單位不另外退費。
                </li>
                <li>
                  學員完成報名繳費後若因故不克前往，將無法轉換至 主辦單位所舉辦其他課程。
                </li>
                <li>
                  為維護課程品質，除主辦單位特別邀請之外，現場不開放家長進入教室陪同上課。
                </li>
                <li>
                  為維護課程品質，本課程每梯次需 30 人以上報名始開班。若發生無法開班情況，主辦單位將於第一時間告知。 
                </li>
                <li>
                  參加本課程之學員需遵守商標與著作權法所列的各項法規，並絕不使用任何方法拷貝或教授教材內容。
                </li>
                <li>
                  學員報名參加本課程即同意無償授權主辦單位使用課程期間所拍攝貴子弟與其作品之照片與影片，並運用刊登於主辦單位所發行之包括但不限於平面刊物、網站、部落格、Facebook 粉絲專頁、電子報、EDM 等相關之行銷活動規劃。 
                </li>
                <li>
                  主辦單位保有最終師資、課程與場地異動與解釋之權利，若有更改將另行通知。
                </li>
              </ol>
              <hr/>
              <h4>【團報規範】</h4>
              <ol>
                <li>
                  提醒您，“團報” 分為 “單人團報” & “多人團報”
                </li>
                <li>
                  “單人團報” 指一人參加2個(含)以上的營隊即算團報！
                </li>
                <li>
                  “多人團報” 請指定一人 “代表”，蒐集所有人的資料，屆時直接由團報代表 “統一填寫表單” & “付款”！
                </li>
                <li>
                  “多人團報” 中的人員若有人因故缺席，臨時辦理取消報名，請找人遞補，並提供遞補者的資料給我們。
                </li>
                <li>
                  提醒您，若無法找到人遞補，且團報因此少於2人，不符合團報人數(2人[含]以上)，則扣除退款差額與手續費後，退還給取消報名者。
                  (ex: A 與 B 2人團報銀河之旅，6400/人，若B臨時退出，A即不符合團報標準，A的票價變為 7200/人，則退給B 6400-800=5600，並扣除人工手續費 10%，最後會退還 5040 給B)
                </li>
              </ol>
              <hr/>
              <h4>【退費】</h4>
              <ol>
                <li>
                  提醒您，退費分為，“活動前退費” & “活動進行中退費”
                </li>
                <li>
                  “活動一個月前” 取消，會先扣除您30%的報名費用總額，將剩餘70%的費用退還給您
                </li>
                <li>
                  “活動前14~7天“ 取消，退50%
                </li>
                <li>
                  “活動進行中~前2天” 取消，不予退費
                </li>
                <li>
                  提醒您，因個人因素無法參加營隊，可以找人替補，請提供替補人選相關資訊
                </li>
              </ol>
              <hr/>
              <p>
                我已詳細閱讀並同意以下條款：
                清大ZU創意教學及各委外服務廠商基於客戶管理、統計及調查分析、會員管理、行銷及其 他合於營業登記項目或章程所定業務需要之特定目的，在此向您蒐集本報名表以上辨識個人資料類別及課程中所拍攝之照片、影片，作為本教育團隊營運期間於台灣、美國地區寄送出版物及各項優惠訊息與調查分析使用。您可向本教育團隊請求查閱、提 供複本、更正或補充個人資訊，及請求刪除或停止處理利用，請您連繫客戶服務中心 0989-722-985。
                若您填寫資料不完整時，可能會影響您收受出版物或優惠訊息之權利。
              </p>
              <div className="checkbox center text-center ">
                <label>
                  <input type="checkbox" defaultChecked={!this.state.submitDisable} onClick={(e)=>{
                    const disable = !e.target.checked;
                    this.setState({submitDisable:disable});
                    console.log(this.state.submitDisable);
                    }
                    
                  }
                  className="block"
                  ></input><b>我同意以上條款</b>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-dismiss="modal">取消</button>
              <button className="btn btn-default" data-dismiss="modal" disabled={this.state.submitDisable} onClick={addProducts}>報名</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}