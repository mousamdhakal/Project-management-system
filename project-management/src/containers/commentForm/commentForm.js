import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as CommentActions from '../../actions/commentActions';

function CommentForm(props) {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.comment.formMessage);

  let info;
  if (props.info) {
    info = props.info();
  }

  const TaskSchema = Yup.object().shape({
    text: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Required'),

    task: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  return (
    <Formik
      initialValues={{
        text: info ? info.text : '',
        task: props.task || '',
      }}
      validationSchema={TaskSchema}
      onSubmit={(values, actions) => {
        // if (!info) {
        // } else {
        //   dispatch(TaskActions.updateTaskById(props.url, JSON.stringify(values, null, 2)));
        // }
        dispatch(CommentActions.fetchNewComment(props.url, JSON.stringify(values, null, 2)));
        actions.setSubmitting(true);
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
            <label htmlFor="title">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Comment text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.text}
            />

            {props.errors.text && props.touched.text && (
              <small className="form-text text-muted">{props.errors.text}</small>
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

export default CommentForm;
