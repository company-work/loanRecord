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
      contractInfo: [
        {
          id: "1",
          name: "借款协议",
          status: "0",
          statusTxt: "未签订"
        },
        {
          id: "2",
          name: "网络小额贷款合同",
          status: "0",
          statusTxt: "未签订"
        }
      ]
    }
  }


//初始化数据
  componentDidMount() {
    return false;
    let self = this;
    //初始化银行卡列表
    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initBankInfo, {
        params: {
          openId: GOKU.openid
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();
        let data = res.data;
        if (data.succ) {
          let result = data.result;
          self.setState({
            banklist: result
          })
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

  Handle(id){
    this.context.router.push('/contractDetails');
  }



  render() {
    let self = this;
    let contract = self.state.contractInfo;
    let contractHtm = contract.map(function (item, index) {
      return (
        <div key={index} onClick={self.Handle.bind(self,item.id)} className="c-item clearfix">
          <div className="pull-left">{item.name}</div>
          <div className="pull-right">{item.statusTxt}<i className="iconfont icon-right"></i></div>
        </div>
      )
    });
    return (
      <div className="page-loanContract">
        <h3 className="c-title">我要签约</h3>
        <div className="c-body">
          {contractHtm}
        </div>
      </div>
    )
  }
}

loanContract.contextTypes = {
  router: React.PropTypes.object
};

module.exports = loanContract;
