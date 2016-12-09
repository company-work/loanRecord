import React, { Component,PropTypes } from 'react'
import './style.scss';

const propTypes = {
  direction: PropTypes.bool,
  className: PropTypes.string
};


class Grid extends Component {

  render() {
    const containerClass = this.props.direction ? 'grid grid-ver' : 'grid grid-hor';
    const className = this.props.className ? this.props.className + " " + containerClass : containerClass;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

Grid.propTypes = propTypes;

module.exports = Grid;
