import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search/Search';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searched: '',
      images: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/images/`);
    const body = await response.json();
    this.setState({ images: body });
  }

  handleChange = (e) => {
    this.setState({ searched: e.target.value });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const searchedPhrase = this.state.searched.toLowerCase();
    const response = await fetch(`/api/images/${searchedPhrase}`);
    const body = await response.json();
    this.setState({ searched: '' });
    if (response.status !== 200) throw Error(body.message);
    else this.setState({ images: body });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Search
                  searched={this.state.searched}
                  images={this.state.images}
                  handleChange={this.handleChange}
                  handleSearch={this.handleSearch}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
