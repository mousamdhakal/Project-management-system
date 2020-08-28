import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import * as taskActions from '../../actions/taskActions';
import * as uiActions from '../../actions/uiActions';

import ModalForm from '../../components/modalForm/modalForm';
import TaskForm from '../../containers/taskForm/taskForm';
import CommentForm from '../../containers/commentForm/commentForm';
// import './taskDetails.css';
// import ProjectForm from '../../containers/projectForm/projectForm';

class TaskDetails extends Component {
  componentDidMount() {
    this.props.getTask(this.props.location.pathname);
    this.props.setActive('tasks');
  }

  info = () => {
    let users = [];
    this.props.task.taggedUsers.forEach((user) => {
      users.push(user.username);
    });
    return {
      title: this.props.task.title || '',
      description: this.props.task.description || '',
      assigned_user: this.props.task.assigned_user || '',
      deadline: this.props.task.deadline || '',
      users: users,
    };
  };

  render() {
    return (
      <div>
        {this.props.task ? (
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
                  <h3 className="text-muted text-center mt-2 mb-4">
                    Task
                    <button className="btn btn-info btn-lg float-right" data-toggle="modal" data-target="#createTask">
                      Edit task
                    </button>
                  </h3>
                  <ModalForm id="createTask" title="Create New user">
                    <TaskForm
                      url={this.props.location.pathname}
                      project={this.props.task.associated_project}
                      info={() => this.info()}
                    />
                  </ModalForm>
                  <ModalForm id="addComment" title="Add new Comment">
                    <CommentForm url={this.props.location.pathname} task={this.props.task.id} />
                  </ModalForm>
                  <div className="container">
                    <div className="card">
                      <div className="card-header">
                        <h3>{this.props.task.title}</h3>
                      </div>
                      <div className="card-body">
                        <h4 className="mb-3">Assigned User : {this.props.task.assigned_user}</h4>
                        <div className="project-description">
                          <h5 className="card-title">Description</h5>
                          <p className="card-text">{this.props.task.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <h5 className="my-3 ml-3">Comments:</h5>
                          {this.props.task.comments.length > 0 ? (
                            this.props.task.comments.map((comment, index) => (
                              <li key={index} className="list-group-item project-task-text">
                                {comment.user} <i className="fas fa-long-arrow-alt-right"></i> {comment.text}
                              </li>
                            ))
                          ) : (
                            <p className="ml-3">No comments in the task.</p>
                          )}
                        </ul>
                        <ul className="list-group user-group mb-4 mt-2">
                          <h5 className="my-3 ml-3">Users:</h5>
                          {this.props.task.taggedUsers.length > 0 ? (
                            this.props.task.taggedUsers.map((user, index) => (
                              <li key={index} className="list-group-item project-user-text">
                                {index + 1} ) {user.first_name} {user.last_name} ({user.username})
                              </li>
                            ))
                          ) : (
                            <p className="ml-3">No users tagged in the task.</p>
                          )}
                        </ul>
                        <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#addComment">
                          Add comment
                        </button>
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
  return { task: state.task.task, user: state.user.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: (url) => dispatch(taskActions.fetchTaskById(url)),
    setActive: (page) => dispatch(uiActions.setActive(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskDetails));
