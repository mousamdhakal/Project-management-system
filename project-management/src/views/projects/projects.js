import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import random from 'random-string-generator';

import * as uiActions from '../../actions/uiActions';

import './projects.css';
import AccordionItem from '../../components/accordionItem/accordionItem';

function Projects() {
  let user = useSelector((state) => state.user.user);
  let history = useHistory();
  const dispatch = useDispatch();

  dispatch(uiActions.setActive('projects'));

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
                <h4 className="text-muted mb-4 mt-2 text-center">Involved Projects</h4>
                <div id="accordion">
                  <div className="row">
                    {user.projects.map((project) => (
                      <AccordionItem unique={random('lower')} key={project.id} id={project.id} title={project.title}>
                        <h5 className="card-title">Project Manager: {project.project_manager}</h5>
                        <p className="card-text text-secondary text-small">{project.description}</p>
                      </AccordionItem>
                    ))}
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
