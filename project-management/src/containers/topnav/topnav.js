import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './topnav.css';
import Modal from '../../components/modal/modal';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import * as userActions from '../../actions/userActions';

function Topnav() {
  const dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    setAuthorizationToken(false);
    localStorage.removeItem('jwtToken');
    dispatch(userActions.removeUser());
    history.push('/login');
  };

  return (
    <>
      <div className="col-xl-10 col-lg-9 col-md-8 ml-auto fixed-top py-2 topnav">
        <div className="row justify-content-sm-between align-items-center">
          <h4 className="text-light text-uppercase pb-1 mb-2 mb-sm-0 ml-sm-4 m-auto">Dashboard</h4>
          <button className="btn btn-light mr-sm-4 m-auto" data-toggle="modal" data-target="#logout">
            Logout
          </button>
        </div>
      </div>
      <Modal id="logout" title="Logout" body="Are you sure you want to logout ?">
        <button className="btn btn-success" data-dismiss="modal">
          Cancel
        </button>
        <button onClick={logout} className="btn btn-danger" data-dismiss="modal">
          Log Out
        </button>
      </Modal>
    </>
  );
}

export default Topnav;
