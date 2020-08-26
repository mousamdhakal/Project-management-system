import React from 'react';
import './dashBoardCard.css';

function DashboardCard(props) {
  return (
    <div className="col-xl-3 col-sm-6 p-2">
      <div className="card card-common">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <i className={`fas ${props.icon} fa-3x ${props.iconStyle}`}></i>
            <div className="text-right text-secondary">
              <h5>{props.title}</h5>
              <h3>{props.count}</h3>
            </div>
          </div>
        </div>
        <div className="card-footer text-secondary">
          <i className="fas fa-sync mr-3"></i>
          <span>Last updated: {props.updated}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
