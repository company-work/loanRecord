import React,{ Component,PropTypes } from 'react';
import Btn from '../../components/button/button.jsx';
import Loading from '../../components/loading/index.jsx';
import Toast from '../../components/toast/index.jsx';
import Axios from 'axios';

//本地模拟测试，联调的时候删掉
import Mock from 'mockjs';
import './style.scss';

const propTypes = {
  className: PropTypes.string,
  telNum: PropTypes.object,
  verifyParams: PropTypes.object,
  id: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  btnTxt: PropTypes.string,
  right: PropTypes.string,
  rightTxt: PropTypes.string
};


class loanVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vTimeout: 60,
      inputVal: "",
      btnFlag: true
    }
  }

  changeVal(evt) {
    this.state.inputVal = evt.target.value;
    this.props.onChange && this.props.onChange(this.state.inputVal);
    this.setState(this.state);
  }

  countDown() {

    let self = this;
    let oTime = self.state.vTimeout;
    if (oTime == 0) {
      self.setState({
        vTimeout: 60,
        btnFlag: true
      });
      self._verifyBtn.innerText = "获取验证码";
      return false;
    } else {
      self._verifyBtn.innerText = "倒计时" + oTime + "s";
      let nTime = --oTime;
      self.setState({
        vTimeout: nTime,
        btnFlag: false
      });
    }
    if (window.vTimeOut) clearTimeout(window.vTimeOut);
    window.vTimeOut = setTimeout(function () {
      self.countDown();
    }, 1000)
  }

  isTel(num) {
    let s = num;
    if (s != null) {
      var r, re;
      re = /^[1][2-9]\d{9}$/g;
      r = re.test(s);
      return r;
    }
    return false;
  }

  isName(txt) {
    let s = txt;
    if (s != null) {
      var r, re;
      re = /^[\u2E80-\u9FFF]+$/g;
      r = re.test(s);
      return r;
    }
    return false;
  }

  isCard(c) {
    let s = c;
    if (s != null) {
      var r, re;
      re = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      r = re.test(s);
      return r;
    }
    return false;
  }

  getVerifyHandler() {

    let self = this;
    //ajax获取验证码
    let verifyObj = this.props.verifyParams;

    let tel = verifyObj.tel;
    let type = verifyObj.type;

    if (!self.state.btnFlag) {
      return false;
    }

    if (tel.length !== 11 || !self.isTel(tel)) {
      Toast.show("请输入正确的手机号");
      return false;
    }

    Loading.show("获取中...");

    Axios.get(GOKU.interFace.sendCheckCode, {
        params: {
          openId: GOKU.openid,
          type:type,
          mobile: tel
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();
        let result = res.data;
        if (result.succ) {
          //验证码倒计时
          Toast.show("发送成功!");
          self.countDown();
        } else {
          Toast.show(result.err_msg);
        }
        //打印信息
        console.log(res);
        console.log("Ajax success");

      })
      .catch(err => {
        Loading.hide();
        Toast.show("服务端繁忙，获取失败!");
        console.log("Ajax error");
      });


  }

  render() {
    let _type = this.props.type;
    let _id = this.props.id;
    let _placeholder = this.props.placeholder;
    let formItem;
    let icon;

    switch (_type) {
      case "text":
        formItem = <input maxLength="6" onChange={this.changeVal.bind(this)} className="input" id={_id} type="text"
                          placeholder={_placeholder}/>;
        break;
      case "password":
        formItem = <input maxLength="6" onChange={this.changeVal.bind(this)} className="input" id={_id} type="password"
                          placeholder={_placeholder}/>;
        break;
      case "tel":
        formItem =
          <input maxLength="6" onChange={this.changeVal.bind(this)} className="input" id={_id} type="tel" maxLength="11"
                 placeholder={_placeholder}/>;
        break;
      case "number":
        formItem = <input maxLength="6" onChange={this.changeVal.bind(this)} className="input" id={_id} type="text"
                          pattern="[0-9]*"
                          placeholder={_placeholder}/>;
        break;
    }

    if (this.props.right) {
      icon = <span className={this.props.right}>{this.props.rightTxt}</span>;
    }

    let btnClass = this.state.btnFlag ? 'active' : 'default';

    return (
      <div className={this.props.className}>
        <div className="input-verify-inner">
          <label className="label">{this.props.text}</label>
          {formItem}
          {icon}
        </div>
        <Btn className={btnClass} refs={(el)=>this._verifyBtn=el}
             onClick={this.getVerifyHandler.bind(this)}>{this.props.btnTxt}</Btn>
      </div>
    );
  }
}

loanVerify.defaultProps = {};
module.exports = loanVerify;
