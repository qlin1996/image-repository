import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searched: '',
      images: [],
    };
  }

  handleChange = (e) => {
    this.setState({ searched: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const searchedPhrase = this.state.searched.toLowerCase();
    const response = await fetch(`/api/images/${searchedPhrase}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    else this.setState({ images: body });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <a href="/">Image Repository</a>
        </nav>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Search"
            type="text"
            value={this.state.searched}
            onChange={this.handleChange}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>

        {this.state.images.map((image) => (
          <div>
            <img src={image.fileLink} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
