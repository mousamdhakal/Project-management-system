import { createNewComment, updateItem } from '../services/http';
import { fetchTaskById } from './taskActions';
// import { fetchProjectById } from './projectsActions';

export const SET_COMMENT_FORM_MESSAGE = 'SET_COMMENT_FORM_MESSAGE';
export const CLEAR_COMMENT_FORM_MESSAGE = 'CLEAR_COMMENT_FORM_MESSAGE';

export const setCommentFormMessage = (message) => ({
  type: SET_COMMENT_FORM_MESSAGE,
  payload: message,
});

export const clearCommentFormMessage = () => ({
  type: CLEAR_COMMENT_FORM_MESSAGE,
});

// export const fetchTaskById = (url) => {
//   return (dispatch) => {
//     getItemById(url)
//       .then((res) => {
//         dispatch(setTask(res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const fetchNewComment = (url, comment) => {
  return (dispatch) => {
    createNewComment(comment)
      .then((res) => {
        dispatch(fetchTaskById(url));
        dispatch(setCommentFormMessage('Comment posted successfully'));
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setCommentFormMessage(error));
        } else {
          console.log(err);
        }
      });
  };
};

export const updateCommentById = (url, task) => {
  return (dispatch) => {
    updateItem(url, task)
      .then((res) => {
        dispatch(fetchTaskById(url));
        dispatch(setCommentFormMessage('Updated successfully'));
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setCommentFormMessage(error));
        } else {
          console.log(err);
        }
      });
  };
};
