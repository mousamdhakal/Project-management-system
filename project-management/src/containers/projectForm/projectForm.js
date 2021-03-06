import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';

import * as projectsActions from '../../actions/projectsActions';

function ProjectForm(props) {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.projects.formMessage);

  let info;
  if (props.info) {
    info = props.info();
  }

  const ProjectSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!').required('Required'),

    description: Yup.string().min(2, 'Too Short!').required('Required'),

    project_manager: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  return (
    <Formik
      initialValues={{
        title: info ? info.title : '',
        description: info ? info.description : '',
        project_manager: info ? info.project_manager : '',
        users: info ? info.users : [''],
      }}
      validationSchema={ProjectSchema}
      onSubmit={(values, actions) => {
        if (!info) {
          dispatch(projectsActions.fetchNewProject(JSON.stringify(values, null, 2)));
        } else {
          dispatch(projectsActions.updateProjectById(props.url, JSON.stringify(values, null, 2)));
        }
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title of the project"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.title}
            />

            {props.errors.title && props.touched.title && (
              <small className="form-text text-muted">{props.errors.title}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Describe the project"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.description}
            />

            {props.errors.description && props.touched.description && (
              <small className="form-text text-muted">{props.errors.description}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="project_manager">Project Manager</label>
            <input
              type="text"
              className="form-control"
              id="project_manager"
              placeholder="Username of the project manager"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.project_manager}
            />

            {props.errors.project_manager && props.touched.project_manager && (
              <small className="form-text text-muted">{props.errors.project_manager}</small>
            )}
          </div>
          <FieldArray
            name="users"
            render={(arrayHelpers) => (
              <div className="form-group">
                <label>Users assigned to project</label>
                {props.values.users && props.values.users.length > 0 ? (
                  props.values.users.map((user, index) => (
                    <div className="form-control" key={index}>
                      <Field className="pb-2 mb-2" name={`users.${index}`} />

                      <button
                        type="button"
                        className="btn btn-danger btn-sm mx-2"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>

                      <button
                        type="button"
                        className="btn btn-info btn-sm mx-2"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button className="btn btn-info" type="button" onClick={() => arrayHelpers.push('')}>
                    Add a user to project
                  </button>
                )}
              </div>
            )}
          />
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

export default ProjectForm;
