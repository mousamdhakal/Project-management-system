import React from 'react';

import Sidebar from '../sidebar/sidebar';
import Topnav from '../topnav/topnav';
import './header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <button
        className="navbar-toggler ml-auto mb-2 bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#myNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="myNavbar">
        <div className="container-fluid">
          <Sidebar />
          <Topnav />
        </div>
      </div>
    </nav>
  );
}

export default Header;
