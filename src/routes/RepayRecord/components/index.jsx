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
          money: "1,250.00",
          date: "2016.11.05"
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
            obj.money = item.allTotalAmt;
            obj.date = item.periods;
            repayArr.push(obj);
          });


          self.setState({
            repayMoney: result.allRepayAmt,
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
      var clsName = "repayRecord-item item-"+index;
      return (
        <div key={index} className={clsName}>
          <div className="item-money">{item.money}</div>
          <div className="item-date">第{item.date}期</div>
        </div>
      );
    });

    return (
      <div className="page-repayRecord">
        {/*合同内容*/}
        <div className="repayRecord-body">
          <div className="repayRecord-info">

            <div className="info-money">
              <h3>应还金额（元）</h3>
              <p>{self.state.repayMoney}</p>
            </div>
          </div>
          <div className="repayRecord-list">
            <div className="list-title clearfix">
              <div className="pull-left">还款金额（元）</div>
              <div className="pull-right">还款期数</div>
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

/*
 <i className="info-time">还款日 {self.state.repayDate}</i>
 */
