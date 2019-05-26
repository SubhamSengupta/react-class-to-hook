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
    this.setState({...this.state, count: this.state.count + 1});
    helperFunction();
    const presentCount = this.state.count;
    this.anotherFunction(this.state.count);
  }

  anotherFunction(logThis){
    console.log(logThis)
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
