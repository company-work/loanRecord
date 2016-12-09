import React,{ Component,PropTypes } from 'react';
import './style.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  maxLenght: PropTypes.string,
  disabled: PropTypes.boolean,
  val: PropTypes.string,
  type: PropTypes.string,

  right: PropTypes.string,
  rightTxt: PropTypes.string
};


class loanInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ""
    }
  }

  changeVal(evt) {
    let _val = evt.target.value;
    let _maxLen = evt.target.dataset.maxlen;

    if (_maxLen && _val.length > _maxLen * 1) {
      evt.target.value = evt.target.value.substr(0, _maxLen * 1);
    }



    this.state.inputVal = evt.target.value;
    this.props.onChange && this.props.onChange(this.state.inputVal);
    this.setState(this.state);
    evt.target.focus();
  }

  render() {

    let _type = this.props.type;
    let _id = this.props.id;
    let _placeholder = this.props.placeholder;
    let disabledFlag = this.props.disabled;
    this.state.inputVal = this.props.val && this.props.val;
    let formItem;
    let icon;

    let mxL = this.props.maxLenght;

    switch (_type) {
      case "text":
        formItem =
          <input disabled={disabledFlag} value={this.state.inputVal} data-maxLen={mxL}
                 onChange={this.changeVal.bind(this)} className="input" id={_id}
                 type="text"
                 placeholder={_placeholder}/>;
        break;
      case "area":
        formItem =
        <textarea disabled={disabledFlag}  value={this.state.inputVal} data-maxLen={mxL}
               onChange={this.changeVal.bind(this)} className="textarea" id={_id}
               placeholder={_placeholder}/>;
            break;
      case "password":
        formItem =
          <input value={this.state.inputVal} disabled={disabledFlag} onChange={this.changeVal.bind(this)} className="input" id={_id}
                 type="password"
                 placeholder={_placeholder}/>;
        break;
      case "tel":
        formItem =
          <input value={this.state.inputVal} disabled={disabledFlag} onChange={this.changeVal.bind(this)} className="input" id={_id}
                 type="tel" maxLength="11"
                 placeholder={_placeholder}/>;
        break;
      case "number":
        formItem =
          <input value={this.state.inputVal} disabled={disabledFlag} data-maxLen={mxL}
                 onChange={this.changeVal.bind(this)} className="input" id={_id}
                 type="number" pattern="[0-9]*"
                 placeholder={_placeholder}/>;
        break;
    }

    if (this.props.right) {
      icon = <span className={this.props.right}>{this.props.rightTxt}</span>;
    }

    return (
      <div className={this.props.className}>
        <label className="label">{this.props.text}</label>
        {formItem}
        {icon}
      </div>
    );
  }
}

loanInput.defaultProps = {};
module.exports = loanInput;
