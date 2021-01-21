import React, { Component } from 'react';
import './Search.css';
import Images from './Images';

class Home extends Component {
  componentDidMount() {
    this.props.grabImages();
    window.scrollTo(0, 0);
  }

  render() {
    const images = this.props.images || [];
    return (
      <React.Fragment>
        <div className="form-container">
          <form onSubmit={this.props.handleSearchByTag}>
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

        {images.length ? (
          <Images
            images={images}
            handleFindSimilar={this.props.handleFindSimilar}
            handleDelete={this.props.handleDelete}
            grabLikedImages={this.props.grabLikedImages}
          />
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
