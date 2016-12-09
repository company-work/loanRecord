import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="main">
        {this.props.children }
      </div>
    )
  }
}

module.exports = App;
