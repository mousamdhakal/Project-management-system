import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as projectsActions from '../../actions/projectsActions';
import * as uiActions from '../../actions/uiActions';

import ModalForm from '../../components/modalForm/modalForm';
import ProjectForm from '../../containers/projectForm/projectForm';
// import UserForm from '../../containers/userForm/userForm';

class ProjectsTable extends Component {
  componentDidMount() {
    this.props.fetchAllProjects();
    this.props.setActive('projects');
  }

  render() {
    return (
      <div>
        {this.props.projects && this.props.user ? (
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
                  <h3 className="text-muted text-center mt-2 mb-4">
                    Projects
                    <button
                      className="btn btn-info btn-lg float-right"
                      data-toggle="modal"
                      data-target="#createProject"
                    >
                      Create new Project
                    </button>
                  </h3>
                  {this.props.message ? (
                    <div className="alert alert-danger" role="alert">
                      {this.props.message}
                    </div>
                  ) : null}
                  <ModalForm id="createProject" title="Create New user">
                    <ProjectForm />
                  </ModalForm>
                  <div className="table-responsive-lg">
                    <table className="table table bg-light text-center">
                      <thead>
                        <tr className="text-muted">
                          <th>#</th>
                          <td>Title</td>
                          <td>Description</td>
                          <td>Project Manager</td>
                          <td>Users</td>
                          {this.props.user.role === 'admin' ? <td>Remove</td> : null}
                        </tr>

                        {this.props.projects.map((project, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.project_manager}</td>
                            <td>
                              <span>{project.users.length}</span>
                              <Link to={{ pathname: `/projects/${project.id}` }}>
                                <button className="btn btn-info btn-sm ml-3">View all</button>
                              </Link>
                            </td>
                            {this.props.user.role === 'admin' ? (
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => this.props.deleteProject(project.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            ) : null}
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
  return { projects: state.projects.projects, user: state.user.user, message: state.projects.deleteMessage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProjects: () => dispatch(projectsActions.fetchAllProjects()),
    deleteProject: (id) => dispatch(projectsActions.deleteAProject(id)),
    setActive: (page) => dispatch(uiActions.setActive(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectsTable));
