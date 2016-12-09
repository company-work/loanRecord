import React, { Component,PropTypes } from 'react'
import './style.scss';

const propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
  refs:PropTypes.func
};

class Button extends React.Component {
  render() {
    //处理style
    let styles = {
      margin: "",
      padding: ""
    };

    //处理margin
    let marginStr = this.props.margin;
    if (marginStr) {
      let marginArr = marginStr.split(" ");
      let marginLen = marginArr.length;
      for (var i = 0; i < marginLen; i++) {
        styles.margin += marginArr[i] + 'px';
      }
    }

    //处理padding
    let paddingStr = this.props.padding;
    if (paddingStr) {
      let paddingArr = paddingStr.split(" ");
      let paddingLen = paddingArr.length;
      for (var i = 0; i < paddingLen; i++) {
        styles.padding += paddingArr[i] + 'px';
      }
    }

    //处理class
    let classarr = ['loan-btn'];
    classarr.push(this.props.className);
    const classNames = classarr.join(" ");

    let refName = this.props.refs;

    //处理margin,padding和className
    return (
      <div ref={refName} style={styles} onClick={this.props.onClick} className={classNames}>
        {this.props.children}
      </div>
    );
  }
}

Button.propTypes = propTypes;

export default Button;

