import React, { useContext, useEffect, useState } from "react";
import { SelectComponent } from "../../../common/components/Form";
import { useApplicationsData } from "../../home/hooks/applications-container.hook";
import { AppContext } from "../../../common/contexts/app.context";

function SelectApplicationComponent() {
    const { applications } = useApplicationsData();
    const { setApplication, application } = useContext(AppContext);
    const [applicationId, setApplicationId] = useState<string>(null);
    const applicationsData = applications ? applications.map(application => {
        return {
            name: application.name,
            value: application.id.toString()
        }
    }) : [];
    const stateProps = {
        state: applicationId,
        setState: setApplicationId
    };
    useEffect(() => {
        if(applications) {
            if(application.id) {
                setApplicationId(application.id.toString());
            } else {
                setApplicationId(applications[0].id?.toString());
            }
        }
    }, [applications]);
    useEffect(() => {
        if(applicationId) {
            const newApplication = applications?.find(app => app.id.toString() === applicationId);
            setApplication(newApplication);
        }
    }, [applicationId]);
    return (
        <div className="select-applications">
            <SelectComponent idInput="application" data={applicationsData} stateProps={stateProps}/>
        </div>
    )
}

export default React.memo(SelectApplicationComponent);