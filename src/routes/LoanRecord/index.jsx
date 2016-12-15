import React,{PropTypes} from 'react';
import history from 'history'
import Loading from 'components/loading/index.jsx';
import Toast from 'components/toast/index.jsx';
import Axios from 'axios';

import {RouterContext,browserHistory } from 'react-router'

class LoanRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanNew: true,
      recordList: [
        {
          money: "10000",
          status: "0",
          statusTxt: "新申请",
          date: "2016.11.10",
          agency: "杭州龙盈整形医院",
          reqNum: ""
        },
        {
          money: "20000",
          status: "2",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院",
          reqNum: ""
        },
        {
          money: "20000",
          status: "0",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院",
          reqNum: ""
        },
        {
          money: "20000",
          status: "2",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院",
          reqNum: ""
        }
      ]
    }
  }

  componentDidMount() {
    //获取数据
    var self = this;
    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initRecord, {
        params: {
          openId: GOKU.openId,
          clientNo: GOKU.clientNo,
          loanType: GOKU.loanType
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();
        let data = res.data;
        if (data.succ) {

          if (data.result.length > 0) {
            let resultData = data.result;
            let recordData = [];
            resultData.forEach(function (item, index) {
              var obj = {};
              obj.money = item.loanAmt;
              obj.status = item.state;
              obj.statusTxt = item.stateTxt;
              obj.date = item.reqDate;
              obj.agency = item.coopName;
              obj.reqNum = item.reqNo;

              recordData.push(obj);
            });

            self.setState({
              recordList: recordData
            })

          } else {
            self.setState({
              recordList: []
            })
          }
        } else {
          Toast.show(data.err_msg);
        }
      })
      .catch(err => {
        Loading.hide();
        Toast.show("服务端繁忙，请稍候...");
      });
  }

  JumpDetails(reqNum) {
    //跳转到详情的时候，把申请编号带过去（ID）
    this.context.router.push('recordDetails/' + reqNum);
  }

  JumpNewLoan(){
    window.location.href="http://192.168.2.246:8000/";
  }

  render() {
    let self = this;
    let recordData = this.state.recordList;
    let recordHtm = recordData.map(function (item, index) {
      let statusCls;

      switch (item.status) {
        case "2":
          statusCls = "record-body record-gray";
          break;
        default:
          statusCls = "record-body";
          break;
      }

      return (
        <div onClick={self.JumpDetails.bind(self,item.reqNum)} key={index} className="record-item">
          <div className={statusCls}>
            <h4>{item.statusTxt}</h4>
            <div className="record-agency">{item.agency}</div>
            <div className="record-time">{item.date}</div>
            <div className="record-money">{item.money}<span>元</span></div>
          </div>
          <div className="record-bot clearfix">
            <div className="pull-left">查看详情</div>
            <div className="pull-right"><i className="iconfont icon-right"></i></div>
          </div>
        </div>
      )
    });

    //新申请入口
    let loanNew = "";
    if (self.state.loanNew) {
      loanNew = <div className="c-title">
        我要借款
        <a onClick={this.JumpNewLoan.bind(this)} href="javascript:void(0);">去借款</a>
      </div>;
    }

    return (
      <div className="page-loanRecord">
        {loanNew}
        <div className="page-loan-list">
          {recordHtm}
        </div>
      </div>
    );
  }
}

LoanRecord.contextTypes = {
  router: React.PropTypes.object
};

module.exports = LoanRecord;
