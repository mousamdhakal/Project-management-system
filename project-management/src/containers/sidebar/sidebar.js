import React from 'react';
import { useSelector } from 'react-redux';

import './sidebar.css';
import SideBarItem from '../../components/sideBarItem/sideBarItem';
import ToastMessage from '../../components/toast/toast';

function Sidebar() {
  let active = useSelector((state) => state.ui.active);
  let user = useSelector((state) => state.user.user);

  let showToast;

  function displayToast() {
    showToast();
  }

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
      <a href="/" className="navbar-brand text-white d-block mx-auto text-center py-3 sidebar__bordered">
        Manage Projects
      </a>
      <div className="sidebar__bordered mb-4 py-2">
        <h4 href="/" className=" text-white p-3 mb-2 d-flex align-items-center">
          <i className="fas fa-user-circle text-light fa-lg mr-3"></i>
          <div>
            <span>{user ? user.username : null}</span>
            <span className="user-role">{user ? user.role : null}</span>
          </div>
        </h4>
      </div>
      <ul className="navbar-nav flex-column">
        <SideBarItem
          class={active === 'dashboard' ? 'sidebar__link--current' : null}
          link="/dashboard"
          icon="fa-home"
          title="Dashboard"
          toast={displayToast}
        />
        <SideBarItem
          class={active === 'projects' ? 'sidebar__link--current' : null}
          link="/projects"
          icon="fa-project-diagram"
          title="Projects"
          toast={displayToast}
        />
        <SideBarItem
          class={active === 'tasks' ? 'sidebar__link--current' : null}
          link="/tasks"
          icon="fa-tasks"
          title="Tasks"
          toast={displayToast}
        />
        <SideBarItem
          class={active === 'comments' ? 'sidebar__link--current' : null}
          icon="fa-comment"
          link="/comments"
          title="Comments"
          toast={displayToast}
        />
        <SideBarItem
          class={active === 'users' ? 'sidebar__link--current' : null}
          link="/users"
          icon="fa-users"
          title="Users"
          toast={displayToast}
        />
      </ul>
      <ToastMessage setToast={(show) => (showToast = show)} />
    </div>
  );
}

export default Sidebar;
