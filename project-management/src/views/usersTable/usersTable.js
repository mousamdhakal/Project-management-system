import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as usersActions from '../../actions/usersActions';
import * as uiActions from '../../actions/uiActions';

import './usersTable.css';
import ModalForm from '../../components/modalForm/modalForm';
import UserForm from '../../containers/userForm/userForm';

class UsersTable extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
    this.props.setActive('users');
  }

  render() {
    return (
      <div>
        {this.props.users ? (
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
                  <h3 className="text-muted text-center mt-2 mb-4">
                    Users
                    <button className="btn btn-info btn-lg float-right" data-toggle="modal" data-target="#createUser">
                      Create new User
                    </button>
                  </h3>
                  <ModalForm id="createUser" title="Create New user">
                    <UserForm />
                  </ModalForm>
                  <div className="table-responsive-lg">
                    <table className="table table bg-light text-center">
                      <thead>
                        <tr className="text-muted">
                          <th>#</th>
                          <td>Username</td>
                          <td>First Name</td>
                          <td>Last Name</td>
                          <td>Role</td>
                          <td>Edit</td>
                          <td>Remove</td>
                        </tr>

                        {this.props.users.map((user, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                            <td>
                              <button className="btn btn-info btn-sm">Edit</button>
                            </td>
                            <td>
                              <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </thead>
                    </table>
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
}

const mapStateToProps = (state) => {
  return { users: state.users.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(usersActions.fetchAllUsers()),
    setActive: (page) => dispatch(uiActions.setActive(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersTable));
