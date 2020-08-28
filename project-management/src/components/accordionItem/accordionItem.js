import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="card-footer text-center">
          <Link to={{ pathname: `${props.link}` }}>
            <button className="btn btn-primary">{props.button}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
