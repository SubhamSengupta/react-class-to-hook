import React, { Component } from "react";

class SampleClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.setState({...state, count: this.state.count + 1});
  }

  render() {
    return (
      <h1>Count is {this.state.count}</h1>
    );
  }
}

export default SampleClass;
