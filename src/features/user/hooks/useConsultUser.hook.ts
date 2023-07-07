import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IConsultUser } from "../../../common/interfaces/user.interfaces";
import { systemUserValidator } from "../../../common/schemas";
import {  useContext, useRef } from "react";
import { AppContext } from "../../../common/contexts/app.context";

export default function useConsultUser() {

    const tableComponentRef = useRef(null);
    const resolver = useYupValidationResolver(systemUserValidator);
    const { application } = useContext(AppContext);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IConsultUser>({ resolver });

    const onSubmitSearch = handleSubmit( async(data: IConsultUser) => {
        loadTableData({ 
        names: data?.names,
        email: data?.email,
        numberDocument: data?.documentNumber,
        lastNames: data?.lastNames,
        application: application.id
      })
    })

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
          tableComponentRef.current.loadData(searchCriteria);
        }
    }
    
    return {
        errors,
        tableComponentRef,
        reset,
        register,
        handleSubmit,
        onSubmitSearch,
    }

}