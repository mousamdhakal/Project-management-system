import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as uiActions from '../../actions/uiActions';

import './projects.css';

function Projects() {
  let user = useSelector((state) => state.user.user);
  let history = useHistory();
  const dispatch = useDispatch();

  dispatch(uiActions.setActive('projects'));

  if (!user) {
    history.push('/dashboard');
  }

  return (
    <div>
      {user ? (
        <div>something</div>
      ) : (
        <div className="loader-div">
          <Loader type="Plane" color="#D40C7A" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Projects;
