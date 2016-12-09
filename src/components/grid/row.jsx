import React, { Component,PropTypes } from 'react'

const propTypes = {
  direction: PropTypes.bool,
  align: PropTypes.string,
  pack: PropTypes.string,
  className: PropTypes.string
};

class Row extends Component {
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

    let baseClass = this.props.direction ? 'row row-ver' : 'row row-hor';

    classNameArr.push(baseClass);
    classNameArr.push(alignClass);
    classNameArr.push(packClass);
    classNameArr.push(this.props.className);

    //定义class合并
    const containerClass = classNameArr.join(" ");

    return (
      <div className={containerClass}>
        {this.props.children}
      </div>
    )
  }
}

//Row.defaultProps = {align: "start"};
Row.propTypes = propTypes;

module.exports = Row;
