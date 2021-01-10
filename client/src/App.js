import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return <div className="App"></div>;
  }
}

export default App;
