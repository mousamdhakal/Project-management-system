import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as uiActions from '../actions/uiActions';

export default function (ComposedComponent, roles = []) {
  class RolesCheck extends Component {
    constructor(props) {
      super(props);
      this.checkRoles();
    }

    checkRoles = () => {
      if (!this.props.user || !roles.includes(this.props.user.role)) {
        if (this.props.location.showToast) {
          this.props.location.showToast();
        }
        const { history } = this.props;
        history.push(`/dashboard`, null);
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { user: state.user.user };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setToast: () => dispatch(uiActions.setToast()),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(withRouter(RolesCheck));
}
