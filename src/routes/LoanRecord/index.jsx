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
      recordList: [
        {
          money: "10000",
          status: "0",
          statusTxt: "新申请",
          date: "2016.11.10",
          agency: "杭州龙盈整形医院"
        },
        {
          money: "20000",
          status: "2",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院"
        },
        {
          money: "20000",
          status: "0",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院"
        },
        {
          money: "20000",
          status: "2",
          statusTxt: "其它状态",
          date: "2016.12.10",
          agency: "丽人医院"
        }
      ]
    }
  }

  componentDidMount() {
    //获取数据
    var self = this;
    return false;
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

          if (data.result != null) {
            let lMoney = data.result['loanAmt'];
            let lTime = data.result['loanLimit'];
            let lRepay = data.result['interest'];

            self.setState({
              loanReqNum: data.result['reqNo'],
              loanInfo: {
                money: lMoney,
                time: lTime,
                repay: lRepay
              }
            })
          } else {
            self.setState({
              loanInfo: null
            })
          }
        } else {
          Toast.show(data.err_msg);
        }
        console.log(res);
        console.log("Ajax success");
      })
      .catch(err => {
        Loading.hide();
        Toast.show("服务端繁忙，请稍候...");
        console.log("Ajax error");
      });
  }

  JumpDetails() {
    this.context.router.push('recordDetails');
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
        <div onClick={self.JumpDetails.bind(self)} key={index} className="record-item">
          <div className={statusCls}>
            <h4>审核通过</h4>
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

    return (
      <div className="page-loanRecord">
        {recordHtm}
      </div>
    );
  }
}

LoanRecord.contextTypes = {
  router: React.PropTypes.object
};

module.exports = LoanRecord;
