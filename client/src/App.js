import React, { Component } from 'react';

class App extends Component {
  state = {
    response: null
  };

  async componentDidMount() {
    const response = await fetch('/api/hello');
    const body = await response.json();
    this.setState({response: body.response});
  };

  render() {
    return (
      <h2>{this.state.response}</h2>
    );
  };
};

export default App;
