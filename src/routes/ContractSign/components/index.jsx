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

class contractSign extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handle() {

  }

  render() {
    let self = this;
    let signHandle = <div onClick={self.handle.bind(self)} className="s-btn"><Btn>确定</Btn></div>;
    return (
      <div className="page-contractSign">
        <div className="s-body">
          <div className="s-hand-box clearfix">
            <div className="pull-left"><i className="iconfont icon-left"></i>返回合同</div>
            <div className="pull-right">撤销<i className="iconfont icon-export"></i></div>
          </div>
        </div>
        {signHandle}
      </div>
    )
  }
}

contractSign.contextTypes = {
  router: React.PropTypes.object
};

module.exports = contractSign;
