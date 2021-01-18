import React, { Component } from 'react';
import './Images.css';
import Image from './Image';

class Images extends Component {
  render() {
    return (
      <div className="image-container">
        {this.props.images.map((image) => (
          <Image
            image={image}
            key={image.id}
            handleFindSimilar={this.props.handleFindSimilar}
            grabLikedImages={this.props.grabLikedImages}
          />
        ))}
      </div>
    );
  }
}

export default Images;
