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
import SignaturePad from '../../../public/bower_components/signature_pad/signature_pad';
//本地模拟测试，联调的时候删掉
import Axios from 'axios';

class contractSign extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let $canvas = this.refs['canvas'];
    if ($canvas) {
      let $domCanvas = document.getElementById($canvas.id);
      let $wid = document.getElementById("sCanvas").clientWidth;
      let $hei = document.getElementById("sCanvas").clientHeight;
      $domCanvas.width = $wid;
      $domCanvas.height = $hei;

      window.$signature = new SignaturePad($domCanvas, {
        minWidth: 5,
        maxWidth: 10
      });
      //console.log($canvas, $domCanvas, $signature)
    }
  }

  goBack() {
  }

  clear() {
    if(!$signature) return;
    $signature.clear();
  }

  handle() {
    //保存簽名
    if(!$signature) return;
    if ($signature.isEmpty()) {
      alert("Please provide signature first.");
    } else {
      window.open($signature.toDataURL());
    }
  }

  render() {
    let self = this;
    let signHandle = <div onClick={self.handle.bind(self)} className="s-btn"><Btn>确定</Btn></div>;
    return (
      <div className="page-contractSign">
        <div className="s-body">
          /*--操作按钮--*/
          <div className="s-hand-box clearfix">
            <div onClick={this.goBack.bind(this)} className="pull-left"><i className="iconfont icon-left"></i>返回合同</div>
            <div onClick={this.clear.bind(this)} className="pull-right">撤销<i className="iconfont icon-export"></i></div>
          </div>
          /*--手绘区域--*/
          <div id="sCanvas" className="s-canvas">
            <canvas ref="canvas" id="canvas"></canvas>
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
