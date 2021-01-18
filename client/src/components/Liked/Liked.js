import React, { Component } from 'react';
import './Liked.css';

class Liked extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="form-container liked">
        <div>
          <h1 className="liked-container">My Liked Pictures</h1>
        </div>
      </div>
    );
  }
}

export default Liked;
