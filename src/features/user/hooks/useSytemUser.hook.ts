import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ISystemUser } from "../../../common/interfaces/user.interfaces";
import { systemUserValidator } from "../../../common/schemas";

export default function useSytemUser() {

    const resolver = useYupValidationResolver(systemUserValidator);

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<ISystemUser>({ resolver });

    const watchedFields = watch([ 'documentNumber', 'email', 'lastNames', 'names', 'profile' ]);

    const onSubmitSearch = handleSubmit((data: ISystemUser) => { 
        console.log(data);
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