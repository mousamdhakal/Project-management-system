import React from 'react';

import LoginForm from '../../containers/loginForm/loginForm';
import './login.css';

function Login() {
  return (
    <div className="login-container container-fluid d-table">
      <section className="Form d-table-cell align-middle mx-1 mx-lg-5 mx-sm-3 login">
        <div className="container">
          <div className="row login-card no-gutters">
            <div className="col-lg-5">
              <img
                src="./assets/images/cover.jpg"
                className="img-fluid login__image"
                alt="Project Management"
              />
            </div>
            <div className="col-lg-7 py-5 px-4 px-lg-5 my-auto">
              <h1 className="font-weight-bold py-3 login__brand">PMS</h1>
              <h5>Log In</h5>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
