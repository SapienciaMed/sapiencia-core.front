import React, { useContext, useEffect, useState } from "react";
import { SelectComponent } from "../../../common/components/Form";
import { useApplicationsData } from "../../home/hooks/applications-container.hook";
import { AppContext } from "../../../common/contexts/app.context";

function selectApplicationComponent() {
    const { applications } = useApplicationsData();
    const [applicationId, setApplicationId] = useState<string>(null);
    const { setApplication } = useContext(AppContext);
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
    /*useEffect(() => {
        if(applications) setApplicationId(applications[9].id.toString())
    }, [applications])*/
    useEffect(() => {
        const newApplication = applications?.find(application => application.id.toString() === applicationId);
        setApplication(newApplication);
        console.log(newApplication)
    }, [applicationId])
    return (
    <div className="select-applications">
        <SelectComponent idInput="application" data={applicationsData} stateProps={stateProps}/>
    </div>
    )
}

export default React.memo(selectApplicationComponent);