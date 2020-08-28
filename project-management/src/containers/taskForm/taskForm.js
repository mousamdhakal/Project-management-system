import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';

import * as TaskActions from '../../actions/taskActions';

function TaskForm(props) {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.task.formMessage);

  let info;
  if (props.info) {
    info = props.info();
  }

  const TaskSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),

    description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    associated_project: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    deadline: Yup.date(),
  });

  return (
    <Formik
      initialValues={{
        title: info ? info.title : '',
        description: info ? info.description : '',
        assigned_user: info ? info.assigned_user : '',
        associated_project: props.project || '',
        deadline: info ? info.deadline : '',
        users: info ? info.users : [''],
      }}
      validationSchema={TaskSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
        // if (!info) {
        dispatch(TaskActions.fetchNewTask(props.url, JSON.stringify(values, null, 2)));
        // } else {
        // dispatch(projectsActions.updateProjectById(props.url, JSON.stringify(values, null, 2)));
        // }
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
              placeholder="Title of the task"
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
            <label htmlFor="assigned_user">Assigned User</label>
            <input
              type="text"
              className="form-control"
              id="assigned_user"
              placeholder="Username of the assigned user"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.assigned_user}
            />

            {props.errors.assigned_user && props.touched.assigned_user && (
              <small className="form-text text-muted">{props.errors.assigned_user}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.deadline}
            />

            {props.errors.deadline && props.touched.deadline && (
              <small className="form-text text-muted">{props.errors.deadline}</small>
            )}
          </div>
          <FieldArray
            name="users"
            render={(arrayHelpers) => (
              <div className="form-group">
                <label>Users tagged to the task</label>
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
                    Tag user to the task
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

export default TaskForm;
