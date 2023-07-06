import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ISystemUser } from "../../../common/interfaces/user.interfaces";
import { systemUserValidator } from "../../../common/schemas";
import { useContext } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";

export default function useSytemUser() {

    const baseURL: string = process.env.urlApiAuth;
    const resolver = useYupValidationResolver(systemUserValidator);
    const { setMessage } = useContext(AppContext);
    const { get, post } = useCrudService(null, baseURL);

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<ISystemUser>({ resolver });

    const watchedFields = watch([ 'documentNumber', 'email', 'lastNames', 'names', 'profile' ]);

    async function GetResultUsers(): Promise<ApiResponse<[]>> {
        return post(`/api/v1/user/search`,[]);
    }

    const onSubmitSearch = handleSubmit((data: ISystemUser) => {
        
        // GetResultUsers().then((response: ApiResponse<[]>) => {
        //     if (response.data.length > 0) {
        //         console.log("🚀 response:", response)  
        //     } else {
        //         setMessage({
        //             title: "Consultar usuario",
        //             show: true,
        //             description: 'no hay resultado para la búsqueda',
        //             OkTitle: "Aceptar",
        //             background: true,
        //         })
        //     }
        // })

    })

    return {
        errors,
        isDirty, 
        isValid,
        watchedFields,
        reset,
        register,
        onSubmitSearch,
    }

}