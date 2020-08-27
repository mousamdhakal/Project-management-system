import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as uiActions from '../../actions/uiActions';

import './comments.css';

function Comments() {
  let user = useSelector((state) => state.user.user);
  let history = useHistory();
  const dispatch = useDispatch();

  dispatch(uiActions.setActive('comments'));

  if (!user) {
    history.push('/dashboard');
  }

  return (
    <div>
      {user ? (
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <div className="jumbotron pt-md-5 mt-md-3 dashboard-jumbotron">
                  <h1 className="display-4">Your comments</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="loader-div">
          <Loader type="Plane" color="#D40C7A" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Comments;
