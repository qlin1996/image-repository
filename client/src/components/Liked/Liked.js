import React, { Component } from 'react';
import './Liked.css';
import Images from '../Search/Images';

class Liked extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.grabLikedImages();
  }

  render() {
    return (
      <React.Fragment>
        <div className="form-container liked">
          <div>
            <h1 className="liked-container">My Liked Pictures</h1>
          </div>
        </div>
        <Images
          images={this.props.images}
          handleFindSimilar={this.props.handleFindSimilar}
          grabLikedImages={this.props.grabLikedImages}
        />
      </React.Fragment>
    );
  }
}

export default Liked;
