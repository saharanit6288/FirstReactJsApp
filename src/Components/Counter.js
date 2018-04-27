import React, { Component } from 'react';


class Counter extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {count: this.props.start || 0}
      
      // the following bindings are necessary to make `this` work in the callback
      this.inc = this.inc.bind(this);
      this.dec = this.dec.bind(this);
    }
    
    inc() {
      this.setState({
        count: this.state.count + 1
      });
    }
    
    dec() {
      this.setState({
        count: this.state.count - 1
      });
    }
    
    render() {
      return (
        <div>
          <button onClick={this.inc}>+</button>
          <button onClick={this.dec}>-</button>
          <div>{this.state.count}</div>
        </div>
      );
    }
  }


export default Counter;