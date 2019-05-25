import React, { Component, useState as MyUseState } from "react";
import PropTypes from "prop-types";

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

const helperFunction = () => {
  return 1 + 3;
}

class AnotherSample extends Component {
  render() {
    return <h1>This is a simple header</h1>;
  }
}

export default SampleClass;
