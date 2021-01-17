import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      tags: [],
    };
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
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
      await axios.post('/api/images', this.state);
      console.log('submitted');
    } catch (err) {
      console.log('ERROR UPLOADING IMAGE>>>', err);
    }
  };

  render() {
    console.log(this.state);
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

          <input type="file" className="upload-image" />

          <div className="upload-button">
            <button>Upload</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
