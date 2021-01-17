import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      tags: [],
      file: null,
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
      await axios.post('/api/images', formData);
    } catch (error) {
      console.log('ERROR UPLOADING IMAGE>>>', error);
    }
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h1>Upload Images</h1>
          </div>

          <div className="upload-title">
            <input
              required
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
              onKeyUp={(event) =>
                event.key === 'Enter' ? this.addTags(event) : null
              }
              placeholder="Press Enter to Add Tags"
            />
          </div>

          <input
            required
            type="file"
            className="upload-image"
            onChange={this.updateFile}
          />

          <div className="upload-button">
            <button>Upload</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
