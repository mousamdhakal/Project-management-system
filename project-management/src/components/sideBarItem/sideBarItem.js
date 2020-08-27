import React from 'react';
import { Link } from 'react-router-dom';

function SideBarItem(props) {
  return (
    <li className="nav-item ">
      <Link to={{ pathname: props.link }} className={`nav-link text-white p-3 mb-2 sidebar__link ${props.class}`}>
        <i className={`fas ${props.icon} text-light fa-lg mr-3`}></i>
        {props.title}
      </Link>
    </li>
  );
}

export default SideBarItem;

// sidebar__link--current
