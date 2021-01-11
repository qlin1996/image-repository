import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    const response = await fetch('/api/images');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <nav>
          <a href="/">Image Repository</a>
        </nav>

        <form>
          <input placeholder="Search" type="text" />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default App;
