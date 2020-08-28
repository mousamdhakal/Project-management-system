import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import random from 'random-string-generator';

import * as uiActions from '../../actions/uiActions';

import './projects.css';
import AccordionItem from '../../components/accordionItem/accordionItem';

function Projects() {
  let user = useSelector((state) => state.user.user);
  let active = useSelector((state) => state.ui.active);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (active !== 'projects') {
      dispatch(uiActions.setActive('projects'));
    }
  }, [active, dispatch]);

  if (!user) {
    history.push('/dashboard');
  }

  return (
    <div>
      {user ? (
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
                {/* Project details */}
                <h3 className="text-muted mb-4 mt-2 text-center">
                  Involved Projects
                  {user.role === 'admin' || user.role === 'projectmanager' ? (
                    <Link to={{ pathname: '/projectstable' }}>
                      <button className="btn btn-info btn-lg float-right">View all Projects</button>
                    </Link>
                  ) : null}
                </h3>
                <div id="accordion">
                  <div className="row">
                    {user.projects.length > 0 || user.managedProjects.length > 0 ? (
                      <>
                        {user.managedProjects.map((project) => (
                          <AccordionItem
                            unique={random('lower')}
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            button="View project Details"
                            link={`/projects/${project.id}`}
                            bg="primary"
                          >
                            <h5 className="card-title">Project Manager: {project.project_manager}</h5>
                            <p className="card-text text-secondary text-small">{project.description}</p>
                          </AccordionItem>
                        ))}
                        {user.projects.map((project) => (
                          <AccordionItem
                            unique={random('lower')}
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            button="View project Details"
                            link={`/projects/${project.id}`}
                            bg="secondary"
                          >
                            <h5 className="card-title">Project Manager: {project.project_manager}</h5>
                            <p className="card-text text-secondary text-small">{project.description}</p>
                          </AccordionItem>
                        ))}
                      </>
                    ) : (
                      <p className="col-10 text-center mt-4 mr-auto">No projects Involved in.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="loader-div">
          <Loader type="Plane" color="#D40C7A" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Projects;
