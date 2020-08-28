import React from 'react';

function ModalForm(props) {
  return (
    <div className="modal fade" id={props.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
            <button type="button" data-dismiss="modal" className="close">
              &times;
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
