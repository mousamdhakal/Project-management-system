import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as projectsActions from '../../actions/projectsActions';
import * as uiActions from '../../actions/uiActions';

import ModalForm from '../../components/modalForm/modalForm';
import './projectDetails.css';
import ProjectForm from '../../containers/projectForm/projectForm';
import TaskForm from '../../containers/taskForm/taskForm';

class ProjectDetails extends Component {
  componentDidMount() {
    this.props.getProject(this.props.location.pathname);
    this.props.setActive('projects');
  }

  info = () => {
    let users = [];
    this.props.project.users.forEach((user) => {
      users.push(user.username);
    });
    return {
      title: this.props.project.title || '',
      description: this.props.project.description || '',
      project_manager: this.props.project.project_manager || '',
      users: users,
    };
  };

  render() {
    return (
      <div>
        {this.props.project ? (
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
                  <h3 className="text-muted text-center mt-2 mb-4">
                    Project
                    <button
                      className="btn btn-info btn-lg float-right"
                      data-toggle="modal"
                      data-target="#createProject"
                    >
                      Edit project
                    </button>
                  </h3>
                  <ModalForm id="createProject" title="Create New Project">
                    <ProjectForm url={this.props.location.pathname} info={() => this.info()} />
                  </ModalForm>
                  <ModalForm id="addTask" title="Add New Task to the project">
                    <TaskForm url={this.props.location.pathname} project={this.props.project.id} />
                  </ModalForm>
                  <div className="container">
                    <div className="card">
                      <div className="card-header">
                        <h3>{this.props.project.title}</h3>
                      </div>
                      <div className="card-body">
                        <h4 className="mb-3">Project Manager : {this.props.project.project_manager}</h4>
                        <div className="project-description">
                          <h5 className="card-title">Description</h5>
                          <p className="card-text">{this.props.project.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <h5 className="my-3 ml-3">Tasks:</h5>
                          {this.props.project.tasks.length > 0 ? (
                            this.props.project.tasks.map((task, index) => (
                              <Link
                                to={{ pathname: `/tasks/${task.id}` }}
                                key={index}
                                className="projects-task bg-info"
                              >
                                <li className="list-group-item project-task-text">
                                  {index + 1} ) {task.title}
                                </li>
                              </Link>
                            ))
                          ) : (
                            <p className="ml-3">No tasks in the project.</p>
                          )}
                        </ul>
                        <ul className="list-group user-group mb-4 mt-2">
                          <h5 className="my-3 ml-3">Users:</h5>
                          {this.props.project.users.length > 0 ? (
                            this.props.project.users.map((user, index) => (
                              <li key={index} className="list-group-item project-user-text">
                                {index + 1} ) {user.first_name} {user.last_name} ({user.username})
                              </li>
                            ))
                          ) : (
                            <p className="ml-3">No users in the project.</p>
                          )}
                        </ul>
                        <div className="text-center col-6">
                          <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#addTask">
                            Add Task
                          </button>
                        </div>
                      </div>
                    </div>
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
  return { project: state.projects.project };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProject: (url) => dispatch(projectsActions.fetchProjectById(url)),
    setActive: (page) => dispatch(uiActions.setActive(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectDetails));
