import React from 'react';
import { useSelector } from 'react-redux';

import './sidebar.css';
import SideBarItem from '../../components/sideBarItem/sideBarItem';

function Sidebar() {
  let active = useSelector((state) => state.ui.active);

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
        <SideBarItem
          class={active === 'dashboard' ? 'sidebar__link--current' : null}
          link="/dashboard"
          icon="fa-home"
          title="Dashboard"
        />
        <SideBarItem
          class={active === 'projects' ? 'sidebar__link--current' : null}
          link="/projects"
          icon="fa-project-diagram"
          title="Projects"
        />
        <SideBarItem
          class={active === 'tasks' ? 'sidebar__link--current' : null}
          link="/tasks"
          icon="fa-tasks"
          title="Tasks"
        />
        <SideBarItem
          class={active === 'comments' ? 'sidebar__link--current' : null}
          icon="fa-comment"
          link="/comments"
          title="Comments"
        />
        <SideBarItem
          class={active === 'users' ? 'sidebar__link--current' : null}
          link="/users"
          icon="fa-users"
          title="Users"
        />
      </ul>
    </div>
  );
}

export default Sidebar;
