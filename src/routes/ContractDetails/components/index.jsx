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
      contractImgList: []
    }
  }

  //初始化数据
  componentDidMount() {
    let self = this;
    let params = self.props.params;
    let contractId = params.contractId;
    //初始化银行卡列表
    Loading.show("验证中...");
    Axios.get(GOKU.interFace.initContractDetails, {
        params: {
          openId: GOKU.openId,
          agreementNo: contractId
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();
        let data = res.data;
        if (data.succ) {
          let result = data.result;
          self.setState({
            contractImgList: result.objectResult
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
    let imgListHtm = self.state.contractImgList.map((item, index)=> {
      return (
        <div key={index} className="item">
          <img src={item}/>
        </div>
      )
    })
    return (
      <div className="page-contractDetails">
        {/*合同内容*/}
        <div className="contract-body">
          {imgListHtm}
        </div>
      </div>
    )
  }
}

ContractDetails.contextTypes = {
  router: React.PropTypes.object
};

module.exports = ContractDetails;
