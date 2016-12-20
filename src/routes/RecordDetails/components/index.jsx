import React,{PropTypes} from 'react';
import history from 'history'
import Loading from 'components/loading/index.jsx';
import Toast from 'components/toast/index.jsx';
import Axios from 'axios';

import './style.scss';
import {RouterContext,browserHistory } from 'react-router'

class RecordDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanInfo: {
        status: "",
        statusTxt: "",
        money: "",
        date: "",
        agency: "",
        loanTime: "",
        repayType: "",
        repayMoney: "",
        interest: ""//利率
      },
      operation: []
    }
  }

  componentDidMount() {
    var self = this;

    let reqNum = self.props.params.loanReqNum;
    if (!reqNum) return false;
    //获取数据

    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initRecordDetails, {
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
          if (data.result != null) {
            let resultData = data.result;

            //格式化详情
            let obj = {};
            obj.status = resultData.state;
            obj.statusTxt = resultData.stateTxt;
            obj.money = resultData.loanAmt;
            obj.date = resultData.loanDate;
            obj.agency = resultData.coopName;
            obj.interest = resultData.loanInterest;

            obj.loanTime = resultData.loanLimit;
            obj.repayType = resultData.repayType;
            obj.repayMoney = resultData.repayAmt;


            //格式化操作按钮
            let arr = [];
            let recordMenu = resultData.menuList;
            recordMenu.forEach(function (item, index) {
              let obj = {};
              obj.name = item.menuTitle;
              obj.desc = item.menuSmallTitle;
              obj.type = item.type;
              obj.img = item.menuImg;
              obj.index = item.orderNum;
              obj.linkUrl = item.linkUrl;

              arr.push(obj);
            });


            //重新赋值
            self.setState({
              loanInfo: obj,
              operation: arr
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

  JumpHandle(type, url) {
    let self = this;
    let params = self.props.params;
    let loanReqNum = params.loanReqNum;
    switch (type) {
      case "loanHome":
        let goUrl = GOKU.loanHomeUrl + "/#/loanhome/" + GOKU.openId + "/" + GOKU.clientNo + "/" + loanReqNum;
        window.location.href = goUrl;
        break;
      case "contract":

        //本地
        let reqNum = self.props.params.loanReqNum;
        this.context.router.push("loanContract/" + reqNum);
        //this.context.router.push("loanContract/100320161202006606");
        break;
    }

  }

  render() {
    let self = this;
    let loanInfo = this.state.loanInfo;
    let loanHandle = this.state.operation;
    let handleHtm;
    handleHtm = loanHandle.map(function (item, index) {
      let handleCls = "pull-left handle-item handle-item-" + (item.index - 1);
      let _type = item;
      return (
        <div onClick={self.JumpHandle.bind(self,item.type,item.linkUrl)} key={index} className={handleCls}>
          <i>
            <img src={item.img}/>
          </i>
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
        </div>
      )
    });

    let statusCls;
    let repayHtm;
    switch (loanInfo.status) {
      case 0:
      case 1:
      case 2:
      case 3:
        statusCls = "record-body";
        repayHtm = <div className="repay-money clearfix">
          <div className="r-title pull-left">利率</div>
          <div className="r-body pull-right">{loanInfo.interest}</div>
        </div>;
        break;
      case -1:
      case 10:
        statusCls = "record-body record-gray";
        break;
      default:
        statusCls = "record-body";
        repayHtm = <div className="repay-money clearfix">
          <div className="r-title pull-left">月还款金额</div>
          <div className="r-body pull-right">{loanInfo.repayMoney}</div>
        </div>;
        break;
    }


    return (
      <div className="page-recordDetails">
        {/*--借款基本信息--*/}
        <div className="record-details">
          <div className={statusCls}>
            <h4>{loanInfo.statusTxt}</h4>
            <div className="record-agency">{loanInfo.agency}</div>
            <div className="record-time">{loanInfo.date}</div>
            <div className="record-money">{loanInfo.money}<span>元</span></div>
          </div>
          <div className="record-repay">
            <div className="repay-time clearfix">
              <div className="r-title pull-left">借款期限</div>
              <div className="r-body pull-right">{loanInfo.loanTime}</div>
            </div>
            {repayHtm}
            <div className="repay-type clearfix">
              <div className="r-title pull-left">还款方式</div>
              <div className="r-body pull-right">{loanInfo.repayType}</div>
            </div>
          </div>
        </div>
        {/*--其它相关操作--*/}
        <div className="record-handle">
          <div className="handle-box clearfix">
            {handleHtm}
          </div>
        </div>
      </div>
    );
  }
}

RecordDetails.contextTypes = {
  router: React.PropTypes.object
};

module.exports = RecordDetails;
