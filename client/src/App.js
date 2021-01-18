import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search/Search';
import Upload from './components/Upload/Upload';
import Liked from './components/Liked/Liked';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searched: '',
      images: [],
      clicked: true,
    };
  }

  grabLikedImages = async () => {
    const { data } = await axios.get(`/api/images/liked`);
    this.setState({ images: data });
  };

  grabImages = async () => {
    const { data } = await axios.get(`/api/images/`);
    this.setState({ images: data });
  };

  handleChange = (e) => {
    this.setState({ searched: e.target.value });
  };

  handleSearchByTag = async (e) => {
    try {
      e.preventDefault();
      const tag = this.state.searched.toLowerCase();
      const { data } = await axios.get(`/api/images/search?tag=${tag}`);
      this.setState({ searched: '', images: data });
    } catch (error) {
      console.log('ERROR SEARCHING IMAGES BY TAG>>>', error);
    }
  };

  handleFindSimilar = async (id) => {
    try {
      const { data } = await axios.get(`/api/images/${id}/similar`);
      this.setState({ searched: '', images: data });
    } catch (error) {
      console.log('ERROR FINDING SIMILAR IMAGES>>>', error);
    }
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
                  handleSearchByTag={this.handleSearchByTag}
                  handleFindSimilar={this.handleFindSimilar}
                  grabImages={this.grabImages}
                />
              )}
            />

            <Route path="/upload" exact>
              <Upload handleFindSimilar={this.handleFindSimilar} />
            </Route>

            <Route path="/liked" exact>
              <Liked
                images={this.state.images}
                handleFindSimilar={this.handleFindSimilar}
                grabLikedImages={this.grabLikedImages}
              />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
