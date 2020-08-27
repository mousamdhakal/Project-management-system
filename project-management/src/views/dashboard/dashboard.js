import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './dashboard.css';
import DashboardCard from '../../components/dashboardCard/dashBoardCard';
import * as userActions from '../../actions/userActions';
import * as uiActions from '../../actions/uiActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const { history } = this.props;
    this.props.fetchUserData(history);
    this.props.setActive('dashboard');
  }

  render() {
    return (
      <>
        {this.props.user ? (
          <>
            <section>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                    <div className="jumbotron pt-md-5 mt-md-3 dashboard-jumbotron">
                      <h1 className="display-4">Welcome {this.props.user.first_name}</h1>
                      <p className="lead">
                        We hope you are having a productive day. Here is the summary of your data for you.
                      </p>
                    </div>
                    <div className="row mb-5">
                      <DashboardCard
                        icon="fa-project-diagram"
                        iconStyle="text-warning"
                        title="Projects"
                        count={`${this.props.user.projects.length}`}
                        updated="2020-02-15"
                      />
                      <DashboardCard
                        icon="fa-tasks"
                        iconStyle="text-success"
                        title="Tasks"
                        count={`${this.props.user.assignedTasks.length}`}
                        updated="2020-02-15"
                      />
                      <DashboardCard
                        icon="fa-comment"
                        iconStyle="text-info"
                        title="Comments"
                        count={`${this.props.user.comments.length}`}
                        updated="2020-02-15"
                      />
                      <DashboardCard
                        icon="fa-tag"
                        iconStyle="text-danger"
                        title="Tagged tasks"
                        count={`${this.props.user.tasks.length}`}
                        updated="2020-02-15"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="loader-div">
            <Loader type="Plane" color="#D40C7A" height={100} width={100} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated, user: state.user.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (history) => dispatch(userActions.getUserData(history)),
    removeUser: () => dispatch(userActions.removeUser()),
    setActive: (page) => dispatch(uiActions.setActive(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
