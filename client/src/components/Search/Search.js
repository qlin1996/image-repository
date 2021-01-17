import React, { Component } from 'react';
import './Search.css';
import Image from './Image';

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <div className="form-container">
          <form onSubmit={this.props.handleSearch}>
            <div>
              <h1>Search Images</h1>
            </div>
            <div className="search-bar">
              <input
                placeholder="Search Images"
                type="text"
                value={this.props.searched}
                onChange={this.props.handleChange}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        {this.props.images.length ? (
          <Image images={this.props.images} />
        ) : (
          <div className="no-results">
            <p>Sorry, no results were found.</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
