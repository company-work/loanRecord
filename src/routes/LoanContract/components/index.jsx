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


class loanContract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogFlag: false,
      signBtn: false,
      signTxt: "一键签约",
      contractInfo: []
    }
  }


//初始化数据
  componentDidMount() {
    let reqNum = this.props.params.reqNum;
    if (!reqNum) return false;

    let self = this;
    //初始化银行卡列表
    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initContract, {
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
          let result = data.result.objectResult;
          if (result.length > 0) {
            let arr = [];
            result.forEach(function (item) {
              let obj = {};
              obj.id = item.contractNo;
              obj.name = item.contractName;
              obj.status = item.state;
              obj.linkUrl = item.contractUrl;
              obj.statusTxt = item.stateTxt;
              arr.push(obj);
            });

            self.setState({
              contractInfo: arr,
              signBtn: (data.result.state == 0 ? true : false)
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


  //一键签约
  goSign() {
    let self = this;
    if (self.state.signBtn) {
      return false;
    }

    let reqNum = this.props.params.reqNum;
    if (!reqNum) return false;

    //初始化银行卡列表
    Loading.show("签约中...");
    Axios.get(GOKU.interFace.goSign, {
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
          self.setState({
            dialogFlag: false,
            signBtn: true,
            signTxt: "已签约"
          });
          window.location.reload();
          Toast.show("签约成功");
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


  Handle(url) {
    window.location.href = url;
  }

  showDialog() {
    if (this.state.signBtn) {
      return false;
    }
    this.setState({
      dialogFlag: true
    })
  }

  hideDialog() {
    this.setState({
      dialogFlag: false
    })
  }


  render() {
    let self = this;
    let contract = self.state.contractInfo;
    let contractHtm = contract.map(function (item, index) {
      return (
        <div key={index} onClick={self.Handle.bind(self,item.linkUrl)} className="c-item clearfix">
          <div className="pull-left">{item.name}</div>
          <div className="pull-right">{item.statusTxt}<i className="iconfont icon-right"></i></div>
        </div>
      )
    });

    //判断签约按钮状态
    let signClsName = self.state.signBtn ? "disable" : "";

    //去合同名字
    let contractData = self.state.contractInfo;
    let contractName = "";

    contractData.forEach((item, index)=> {
      if ((contractData.length-1) == index) {
        contractName += "《" + item.name + "》，";
      }else{
        contractName += "《" + item.name + "》、";
      }
    });

    let dialogHtm;
    if (self.state.dialogFlag) {
      dialogHtm = <div className="c-dialog">
        <div className="c-dialog-inner">
          <div className="c-dialog-cnt">
            <div className="c-dialog-title">温馨提示</div>
            <div className="c-dialog-body">请仔细阅读{contractName}点击一键签约表示你同意签署以上所有合同并遵守合同中规定的所有条款。</div>
          </div>
          <div onClick={this.goSign.bind(this)} className="c-dialog-btn">一键签约</div>
          <div onClick={this.hideDialog.bind(this)} className="c-dialog-close"></div>
        </div>
      </div>
    }

    return (
      <div className="page-loanContract">
        <h3 className="c-title">我要签约
          <a onClick={this.showDialog.bind(this)} className={signClsName}
             href="javascript:void(0);">{self.state.signTxt}</a>
        </h3>
        <div className="c-body">
          {contractHtm}
        </div>
        {dialogHtm}
      </div>
    )
  }
}

loanContract.contextTypes = {
  router: React.PropTypes.object
};

module.exports = loanContract;
