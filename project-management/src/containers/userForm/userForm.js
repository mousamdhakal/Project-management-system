import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as usersActions from '../../actions/usersActions';

function UserForm(props, operation) {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.users.formMessage);

  const UserSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        'Password must contain at least 8 characters including one letter and one number'
      ),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', first_name: '', last_name: '', role: '' }}
      validate={(values) => {
        const errors = {};

        if (!['projectmanager', 'teamlead', 'engineer'].includes(values.role)) {
          errors.role = 'Only projectmanager / teamlead / engineer allowed as role';
        }

        return errors;
      }}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        dispatch(usersActions.fetchNewUser(JSON.stringify(values, null, 2)));
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {message ? (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          ) : null}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="username"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
            />

            {props.errors.username && props.touched.username && (
              <small className="form-text text-muted">{props.errors.username}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter First name"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.first_name}
            />

            {props.errors.first_name && props.touched.first_name && (
              <small className="form-text text-muted">{props.errors.first_name}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter Last name"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.last_name}
            />

            {props.errors.last_name && props.touched.last_name && (
              <small className="form-text text-muted">{props.errors.last_name}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              placeholder="projectmanager / teamlead / engineer"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.role}
            />

            {props.errors.role && props.touched.role && (
              <small className="form-text text-muted">{props.errors.role}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="*******"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
            />

            {props.errors.password && props.touched.password && (
              <small className="form-text text-muted">{props.errors.password}</small>
            )}
          </div>
          <div className="text-center">
            <button className="btn btn-info" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default UserForm;
