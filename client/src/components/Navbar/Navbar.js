import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav>
        <div className="nav-container">
          <a href="/">
            <h1 className="navbar-logo">Image Repository</h1>
          </a>
          <div className="menu-icon" onClick={this.handleClick}>
            <i
              className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}
            ></i>
          </div>
          <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link to="/" className="nav-link" onClick={this.handleClick}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="nav-link"
                onClick={this.handleClick}
              >
                Upload
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
