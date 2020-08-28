import React from 'react';

function AccordionItem(props) {
  return (
    <div className="card col-lg-8 m-auto">
      <div className="card-header">
        <button
          className={`btn btn-block bg-${props.bg} text-light text-center`}
          data-toggle="collapse"
          data-target={`#${props.unique}`}
        >
          {props.title}
        </button>
      </div>
      <div className="collapse" id={`${props.unique}`} data-parent="#accordion">
        <div className="card-body">{props.children}</div>
      </div>
    </div>
  );
}

export default AccordionItem;
