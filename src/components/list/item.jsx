import React, { Component,PropTypes } from 'react'
import Select from '../select/select.jsx';

const propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

var item = {
  xx: ""
};

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      selectVal:""
    }
  }

  changeVal(evt){
    this.state.inputVal = evt.target.value;
    this.props.onChange && this.props.onChange(this.state.inputVal);
    this.setState(this.state);
  }

  selectVal(val){
    this.state.selectVal = val;
    this.props.onChange && this.props.onChange(this.state.selectVal);
    this.setState(this.state);
  }


  render() {
    let _data = this.props.item;
    let _type = _data.type;
    let _id = _data.id;
    let _placeholder = _data.placeholder;
    let formItem;
    let icon;

    switch (_type) {
      case "text":
        formItem = <input value={this.state.inputVal} onChange={this.changeVal.bind(this)} className="input" id={_id} type="text" placeholder={_placeholder}/>;
        break;
      case "password":
        formItem = <input value={this.state.inputVal} onChange={this.changeVal.bind(this)} className="input" id={_id} type="password" placeholder={_placeholder}/>;
        break;
      case "tel":
        formItem = <input value={this.state.inputVal} onChange={this.changeVal.bind(this)} className="input" id={_id} type="tel" maxLength="11" placeholder={_placeholder}/>;
        break;
      case "number":
        formItem = <input value={this.state.inputVal} onChange={this.changeVal.bind(this)} className="input" id={_id} type="number" pattern="[0-9]*" placeholder={_placeholder}/>;
        break;
      case "select":
        formItem = <Select onChange={this.selectVal.bind(this)}  className="select loan-select" select={_data.data}></Select>
        break;
    }

    if (_data.icon) {
      icon = <span className={_data.iconClass}>{_data.icon}</span>;
    }

    return (
      <li className={this.props.className}>
        <label className="label">{_data.label}</label>
        {formItem}
        {icon}
      </li>
    );
  }
}

//Col.defaultProps = {};
//ListItem.propTypes = propTypes;

module.exports = ListItem;
