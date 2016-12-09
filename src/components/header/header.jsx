import './header.scss';
import React from 'react';
import { Link } from 'react-router'

class HeaderComponent extends React.Component {
  render() {
    return (
      <div>
        <span>
          <div>
            <span className="iconfont icon-aliwangwang"></span>
          </div>
          <p><Link to="/about">About我是header组件我是header组件</Link></p>
          <p>
            <i className="iconfont icon-right"></i>
          </p>
        </span>
      </div>
    );
  }
}
HeaderComponent.defaultProps = {};

export default HeaderComponent;

