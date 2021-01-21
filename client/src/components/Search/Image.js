import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Images.css';

class Image extends Component {
  constructor() {
    super();
    this.state = {
      liked: '',
    };
  }

  componentDidMount() {
    this.setState({ liked: this.props.image.liked });
  }

  like = async (image) => {
    await axios.patch(`/api/images/${image.key}`, {
      liked: !this.state.liked,
    });
    this.props.grabLikedImages();
    this.setState({ liked: !this.state.liked });
  };

  render() {
    const image = this.props.image;
    return (
      <div>
        <div className="image-photo">
          <img alt={image.Title} src={image.fileLink} />
          {this.state.liked ? (
            <button className="image-heart" onClick={() => this.like(image)}>
              <i className="fas fa-heart"></i>
            </button>
          ) : (
            <button className="image-heart" onClick={() => this.like(image)}>
              <i className="far fa-heart"></i>
            </button>
          )}
          <a className="image-download" href={image.fileLink}>
            <i className="fas fa-file-download" />
          </a>
        </div>

        <div className="image-info">
          <p>{image.title} </p>
          <div>
            <small>Tags: </small>
            {image.tags.map((tag) => {
              if (image.tags[image.tags.length - 1] !== tag) {
                return (
                  <small key={tag}>
                    {tag}
                    {', '}
                  </small>
                );
              } else return <small key={tag}>{tag}</small>;
            })}
          </div>

          <div>
            <Link to="/">
              <button onClick={() => this.props.handleFindSimilar(image.key)}>
                Find Similar
              </button>
            </Link>
            <button onClick={() => this.props.handleDelete(image.key)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
