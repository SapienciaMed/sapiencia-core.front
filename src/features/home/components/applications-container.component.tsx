import React, { Fragment, useContext } from "react";
import { useApplicationsData } from "../hooks/applications-container.hook";
import { IMenuAccess } from "../../../common/interfaces/menuaccess.interface";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";

function ApplicationCardComponent() {
  const navigate = useNavigate();
  const { applications } = useApplicationsData();
  const { authorization } = useContext(AppContext);
  if (applications && authorization.allowedApplications) {
    const applicationsFilter = applications.filter(object => authorization.allowedApplications.some(filtro => object.id === filtro.aplicationId) && object.showInHome === true);
    return <Fragment>
      {
        applicationsFilter.map((app: IMenuAccess) => {
          let imagePath: string | undefined;
          try {
            imagePath = require(`../../../public/images/icons-aplication/application-icon-${app.id}.svg`);
          } catch {
            imagePath = require('../../../public/images/application-image-default.png');
          }
          return (
            <div className="card-body" key={app.id} onClick={() => {navigate(app.url)}}>
              <div className="card-header">
                <img
                  src={imagePath}
                />
              </div>
              <div className="card-footer">
                <p className="text-dasboard big text-center">{app.name}</p>
              </div>
            </div>
          );
        })
      }
    </Fragment>
  } else {
    return <></>
  }
};

function ApplicationsContainer(): JSX.Element {
  return (
    <section className="applications-cards">
      <ApplicationCardComponent />
    </section>
  );
}

export default React.memo(ApplicationsContainer);
