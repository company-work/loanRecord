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

class ContractDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanStatus: 1,
      contractTxt: "",
      contractUrl: "http://app.longyinglicai.com/xieyi.html"
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

  handle(){
    this.context.router.push('/contractSign');
  }


  render() {
    let self = this;
    let contractHandle;
    if (self.state.loanStatus == 1) {
      contractHandle = <div onClick={self.handle.bind(self)} className="contract-handle"><Btn>区签约</Btn></div>
    }

    return (
      <div className="page-contractDetails">
        {/*合同内容*/}
        <div className="contract-body">
          <iframe frameBorder="0" width="100%" height="100%" src={self.state.contractUrl}></iframe>
        </div>
        {/*合同操作*/}
        {contractHandle}
      </div>
    )
  }
}

ContractDetails.contextTypes = {
  router: React.PropTypes.object
};

module.exports = ContractDetails;
