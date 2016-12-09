import React,{ Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const propTypes = {
  className: PropTypes.string,
  result: PropTypes.array,
  id: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  right: PropTypes.string,
  rightTxt: PropTypes.string,
  disabled: PropTypes.boolean,
  val: PropTypes.object
};

window.scrollFlag = false;

class loanSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableFlag: false,
      selectInit: false,
      selectFlag: false,
      selectVal: "请选择",
      selectKey: "-1",
      updateFlag: false,
      scrollFlag: false
    }
  }

  componentDidMount() {
    let defaultObj = this.props.val;
    if (defaultObj) {
      let _val = defaultObj.value;
      let _key = defaultObj.key;
      this.setState({
        selectVal: _val ? _val : "请选择",
        selectKey: _key ? _key : "-1"
      })
    }
    let self = this;
    document.addEventListener('click', this._onBlurHandler.bind(self), false);
  }

  shouldComponentUpdate(newProps, newState) {

    if (newProps.val) {
      newState.selectVal = newProps.val.value;
      newState.selectKey = newProps.val.key;
      newState.selectInit = true;
      newState.updateFlag = true;
    }

    if (false) {
      return false;
    } else {
      return true;
    }
  }


  show(e) {
    if (this.props.disabled) {
      return false;
    }
    if (!this.state.selectInit) {
      if (this.state.selectVal != "请选择") {
        this.state.selectInit = true;
      }
    }
    this.state.selectFlag = true;
    this.setState(this.state);

    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  hide(v) {
    this.state.selectVal = v.value;
    this.state.selectKey = v.key;
    let obj = {};
    obj.key = v.key;
    obj.value = v.value;
    if (v.value != "请选择") {
      this.state.selectInit = true;
      this.props.onChange && this.props.onChange(obj);
    }
    this.state.selectFlag = false;
    this.setState(this.state);
  }

  _onBlurHandler(e) {
    var self = this;
    self.setState({
      selectFlag:false
    })
  }


  componentWillUnmount() {
    var self = this;
    document.removeEventListener('click', this._onBlurHandler.bind(self), false);
  }


  render() {
    //定义列表
    var list = this.props.result.map((item) => {
      if (this.state.selectVal == item.value) {
        return <div className="sel-active" onClick={this.hide.bind(this,item)} key={item.key}>{item.value}</div>;
      } else {
        return <div onClick={this.hide.bind(this,item)} key={item.key}>{item.value}</div>;
      }
    });

    //定义placeholder
    let initFlag = this.state.selectInit;
    let placeholderHtm = "";
    if (!initFlag) {
      placeholderHtm =
        <div onClick={this.show.bind(this)} className="select-intro select-placeholder">{this.state.selectVal}</div>
    } else {
      placeholderHtm =
        <div onClick={this.show.bind(this)} className="select-intro select-val">{this.state.selectVal}</div>
    }

    let icon;

    if (!this.props.disabled) {
      icon = <span className="iconfont icon-caretdown icon-select"></span>;
    }

    return (
      <div className="loan-select-box">
        <label className="label">{this.props.text}</label>
        <div className={this.props.className}>
          {icon}
          {placeholderHtm}
          <div ref="selectBox" className={this.state.selectFlag?"select-item select-show":" select-item select-hide"}>
            {list}
          </div>
        </div>

      </div>
    );
  }
}

module.exports = loanSelect;
