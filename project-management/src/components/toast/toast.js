import React, { useState } from 'react';
import './toast.css';
import { Toast } from 'react-bootstrap';

function ToastMessage(props) {
  const [show, setShow] = useState(false);
  props.setToast(setShow);
  return (
    <div className="toast-wrapper" aria-live="polite" aria-atomic="true">
      <Toast
        className="toast-content bg-danger text-white"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header className="bg-danger text-white">
          <strong className="mr-auto">Unauthorized</strong>
          <small>Just now!!</small>
        </Toast.Header>
        <Toast.Body>Content is not authorized for this user.</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastMessage;
