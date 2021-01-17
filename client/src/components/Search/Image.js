import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  render() {
    return (
      <div className="image-container">
        {this.props.images.map((image) => (
          <div key={image.id}>
            <div className="image-photo">
              <img alt={image.Title} src={image.fileLink} />
            </div>
            <div className="image-info">
              <p>{image.title} </p>
              <div>
                <small>Tags:</small>
                {image.tags.map((tag) => (
                  <button key={tag}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Image;
