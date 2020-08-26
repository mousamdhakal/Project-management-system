import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
      <a href="/" className="navbar-brand text-white d-block mx-auto text-center py-3 sidebar__bordered">
        Manage Projects
      </a>
      <div className="sidebar__bordered mb-4 py-4">
        <a href="/" className=" text-white p-3 mb-2">
          <i className="fas fa-user-circle text-light fa-lg mr-3"></i>mousam
        </a>
      </div>
      <ul className="navbar-nav flex-column">
        <li className="nav-item ">
          <a href="/" className="nav-link text-white p-3 mb-2 sidebar__link sidebar__link--current">
            <i className="fas fa-home text-light fa-lg mr-3"></i>Dashboard
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-link text-white p-3 mb-2 sidebar__link">
            <i className="fas fa-project-diagram text-light fa-lg mr-3"></i>Projects
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-link text-white p-3 mb-2 sidebar__link">
            <i className="fas fa-tasks text-light fa-lg mr-3"></i>Tasks
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-link text-white p-3 mb-2 sidebar__link">
            <i className="fas fa-comment text-light fa-lg mr-3"></i>Comments
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-link text-white p-3 mb-2 sidebar__link">
            <i className="fas fa-users text-light fa-lg mr-3"></i>Users
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
