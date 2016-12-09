import React, { Component,PropTypes } from 'react'
import ListItem from './item.jsx';
import './style.scss';

const propTypes = {
  className: PropTypes.string,
  list: PropTypes.array
};


class List extends Component {
  render() {
    let changeHandler = this.props.onChange;
    var item = this.props.list.map(function (item) {
      return <ListItem onChange={changeHandler} key={item.id} className={item.id} item={item}/>
    });

    return (
      <ul className={this.props.className}>
        {item}
      </ul>
    );
  }
}


List.propTypes = propTypes;
module.exports = List;
