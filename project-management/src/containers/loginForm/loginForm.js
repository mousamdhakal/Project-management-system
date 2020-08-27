import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as userActions from '../../actions/userActions';

function LoginForm() {
  const dispatch = useDispatch();
  let history = useHistory();
  let message = useSelector((state) => state.user.loginMessage);

  const handleLogin = (data) => {
    dispatch(userActions.fetchUser(data, history));
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: (values) => {
      handleLogin(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {message ? (
        <div class="alert alert-danger" role="alert">
          {message}
        </div>
      ) : null}
      <div className="form-row">
        <div className="col-lg-7">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control my-3 p-4"
            onChange={formik.handleChange}
            value={formik.values.username || ''}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-lg-7">
          <input
            type="password"
            name="password"
            placeholder="******"
            className="form-control my-3 p-4"
            onChange={formik.handleChange}
            value={formik.values.password || ''}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-lg-7">
          <button type="submit" className="btn1 mt-3 mb-5">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
