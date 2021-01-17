import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search/Search';
import Upload from './components/Upload/Upload';
import axios from 'axios';
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
    const { data } = await axios.get(`/api/images/`);
    this.setState({ images: data });
  }

  handleChange = (e) => {
    this.setState({ searched: e.target.value });
  };

  handleSearch = async (e) => {
    try {
      e.preventDefault();
      const searchedPhrase = this.state.searched.toLowerCase();
      const { data } = await axios.get(`/api/images/${searchedPhrase}`);
      this.setState({ searched: '', images: data });
    } catch (err) {
      console.log('ERROR SEARCHING IMAGE>>>', err);
    }
  };

  render() {
    console.log(this.state);
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

            <Route path="/upload" exact>
              <Upload />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
