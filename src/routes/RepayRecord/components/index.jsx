import React, { Component } from 'react'
import Grid from 'components/grid/grid.jsx';
import Row from 'components/grid/row.jsx';
import Col from 'components/grid/col.jsx';
import LoanSelect from 'components/select/select.jsx';
import LoanInput from 'components/input/index.jsx';
import Btn from 'components/button/button.jsx';
import LoanVerify from 'components/verify/index.jsx';
import {browserHistory} from 'react-router';
import Toast from 'components/toast/index.jsx';
import Loading from 'components/loading/index.jsx';
//本地模拟测试，联调的时候删掉
import Axios from 'axios';

class RepayRecord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repayDate: "02/05",
      repayMoney: "15,800.00",
      repayRecordList: [
        {
          state: "1",
          stateTxt: "已逾期",
          money: "1,250.00",
          date: "2016.11.05",
          m1: "1,000.00",
          m2: "200.00",
          m3: "50.00",
          isRepayTime: false
        }
      ]
    }
  }

  //初始化数据
  componentDidMount() {
    let self = this;
    let params = self.props.params;
    let reqNum = params.reqNum;
    //初始化银行卡列表
    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initRepayRecord, {
        params: {
          openId: GOKU.openId,
          reqNo: reqNum
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();
        let data = res.data;
        if (data.succ) {
          let result = data.result;
          var repayArr = [];
          result.repayPlanInfos.forEach(function (item, index) {
            var obj = {};
            obj.isRepayTime = item.accFlag;
            obj.state = item.status;
            obj.stateTxt = item.statusText;
            obj.money = item.allTotalAmt;
            obj.date = item.repayDate;
            obj.m1 = item.periodAmt;
            obj.m2 = item.profitAmt;
            obj.m3 = item.serviceFeeAmt;

            repayArr.push(obj);
          });


          self.setState({
            repayMoney: result.currAmt,
            repayDate: result.currDate,
            repayRecordList: repayArr
          });
        } else {
          Toast.show(data.err_msg);
        }
      })
      .catch(err => {
        Loading.hide();
        Toast.show("服务端繁忙，请稍候...");
        console.log("Ajax error");
      });
  }

  render() {
    let self = this;
    let repayList = self.state.repayRecordList;
    let repayItem = repayList.map(function (item, index) {
      var clsName = item.isRepayTime ? "repayRecord-item active" : "repayRecord-item";
      if (item.isRepayTime) {
        return (
          <div key={index} className={clsName}>
            <div className="item-money">{item.money}<i>{item.stateTxt}</i></div>
            <div className="item-date">{item.date}</div>
            <div className="item-intro">本金 {item.m1}+利息 {item.m2}+服务费 {item.m3}</div>
          </div>
        );
      } else {
        return (
          <div key={index} className={clsName}>
            <div className="item-money">{item.money}</div>
            <div className="item-date">{item.date}</div>
            <div className="item-intro">本金 {item.m1}+利息 {item.m2}+服务费 {item.m3}</div>
          </div>
        );
      }

    });

    return (
      <div className="page-repayRecord">
        {/*合同内容*/}
        <div className="repayRecord-body">
          <div className="repayRecord-info">
            <i className="info-time">还款日 {self.state.repayDate}</i>
            <div className="info-money">
              <h3>应还金额（元）</h3>
              <p>{self.state.repayMoney}</p>
            </div>
          </div>
          <div className="repayRecord-list">
            <div className="list-title clearfix">
              <div className="pull-left">还款金额（元）</div>
              <div className="pull-right">还款日期</div>
            </div>
            {repayItem}

          </div>
        </div>
      </div>
    )
  }
}

RepayRecord.contextTypes = {
  router: React.PropTypes.object
};

module.exports = RepayRecord;
