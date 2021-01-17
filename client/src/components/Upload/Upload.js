import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';
import Image from '../Search/Image';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      tags: [],
      file: null,
      image: [],
    };
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  updateFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  addTags = (e) => {
    if (e.target.value !== '') {
      this.setState({ tags: [...this.state.tags, e.target.value] });
      e.target.value = '';
    }
  };

  removeTags = (indexToRemove) => {
    const filteredTags = this.state.tags.filter(
      (_, index) => index !== indexToRemove
    );
    this.setState({ tags: filteredTags });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', this.state.file);
      formData.append('tags', this.state.tags);
      formData.append('title', this.state.title);
      const { data } = await axios.post('/api/images', formData);
      this.setState({ title: '', tags: [], file: null, image: [data] });
    } catch (error) {
      console.log('ERROR UPLOADING IMAGE>>>', error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <h1>Upload Image</h1>
            </div>

            <div className="upload-title">
              <input
                required
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
                placeholder="Image Title"
                type="text"
                value={this.state.title}
                onChange={this.updateTitle}
              />
            </div>

            <div className="upload-tags">
              <ul id="tags">
                {this.state.tags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <i
                      className="far fa-times-circle"
                      onClick={() => this.removeTags(index)}
                    />
                  </li>
                ))}
              </ul>
              <input
                type="text"
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
                onKeyUp={(event) =>
                  event.key === 'Enter' ? this.addTags(event) : null
                }
                placeholder="Press Enter to Add Tags"
              />
            </div>

            <input
              required
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              type="file"
              className="upload-image"
              onChange={this.updateFile}
            />

            <div className="upload-button">
              <button>Upload</button>
            </div>
          </form>
        </div>
        {this.state.image.length ? (
          <p className="upload-success">
            Your image has been uploaded successfully.{' '}
          </p>
        ) : null}
        <Image
          images={this.state.image}
          handleFindSimilar={this.props.handleFindSimilar}
        />
      </React.Fragment>
    );
  }
}

export default Upload;
