import React, { Component,PropTypes } from 'react'

const propTypes = {
  align: PropTypes.string,
  pack: PropTypes.string,
  className: PropTypes.string
};


class Col extends Component {
  render() {
    var classNameArr = [];
    //定义对齐方式
    let alignClass = "";
    let packClass = "";
    if (this.props.align) {
      switch (this.props.align) {
        case "start":
          alignClass = 'v-start';
          break;
        case "center":
          alignClass = 'v-center';
          break;
        case "end":
          alignClass = 'v-end';
          break;
      }
    }
    if (this.props.pack) {
      switch (this.props.pack) {
        case "start":
          packClass = 'h-start';
          break;
        case "center":
          packClass = 'h-center';
          break;
        case "end":
          packClass = 'h-end';
          break;
      }
    }

    classNameArr.push(alignClass);
    classNameArr.push(packClass);
    classNameArr.push(this.props.className);
    classNameArr.push("row");

    //定义class合并
    const containerClass = classNameArr.join(" ");


    return (
      <div className={containerClass}>
        {this.props.children}
      </div>
    )
  }
}

//Col.defaultProps = {};
Col.propTypes = propTypes;

module.exports = Col;
