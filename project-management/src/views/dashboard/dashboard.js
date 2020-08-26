import React from 'react';
import Header from '../../containers/header/header';
import './dashboard.css';
import DashboardCard from '../../components/dashboardCard/dashBoardCard';

function Dashboard() {
  return (
    <>
      <Header />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5">
                <DashboardCard
                  icon="fa-project-diagram"
                  iconStyle="text-warning"
                  title="Projects"
                  count="2"
                  updated="2020-02-15"
                />
                <DashboardCard icon="fa-tasks" iconStyle="text-success" title="Tasks" count="7" updated="2020-02-15" />
                <DashboardCard
                  icon="fa-comment"
                  iconStyle="text-info"
                  title="Comments"
                  count="2"
                  updated="2020-02-15"
                />
                <DashboardCard
                  icon="fa-tag"
                  iconStyle="text-danger"
                  title="Tagged tasks"
                  count="2"
                  updated="2020-02-15"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
