import React, { Fragment, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonComponent, FormComponent, InputComponent, TransferBoxComponent } from "../../../common/components/Form";
import { IRequestRole } from "../../../common/interfaces/role.interface";
import { roleValidator } from "../../../common/schemas";
import { EDirection } from "../../../common/constants/input.enum";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useRoleData } from "../hooks/role-crud.hook";
import { useNavigate } from "react-router-dom";
import useRoleService from "../hooks/role-service.hook";
import { ITransferBoxTemplate } from "../../../common/interfaces/transfer-box.interface";
import { AppContext } from "../../../common/contexts/app.context";
import { IActions } from "../../../common/interfaces/options.interface";

interface IAppProps { }

interface IRoleForm {
    nombreRol: string;
    descripcionRol: string;
    accionesRol: {
        available: ITransferBoxTemplate[],
        selected: ITransferBoxTemplate[]
    }
}

function RoleCrudPage(props: IAppProps) {
    return (
        <div className="role-form">
            <RoleForm />
        </div>
    )
}

function RoleForm() {
    const { authorization } = useContext(AppContext);
    const { CreateRole } = useRoleService();
    const navigate = useNavigate();
    const { options, optionsTransfer } = useRoleData();
    const resolver = useYupValidationResolver(roleValidator);
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue: setValueRegister
    } = useForm<IRequestRole>({ resolver });
    const onSubmitRole = handleSubmit(async (data: IRoleForm) => {
        debugger
        const actionsSelected: IActions[] = [];
        data.accionesRol.selected.forEach((item) => {
            const optionSelected = options.find(option => option.id === item.id);
            optionSelected.actions.filter(object => item.children.some(filtro => object.id === filtro.id)).forEach(action => actionsSelected.push(action));
        })
        CreateRole({
            name: data.nombreRol,
            description: data.descripcionRol,
            aplicationId: 1,
            userCreate: `test`,
            actions: actionsSelected
        }).then(response => {
            console.log(response)
        })
    });
    const onCancel = () => {
        navigate("./../")
    }
    return (<Fragment>
        <FormComponent action={onSubmitRole}>
            <div className="card-form">
                Roles
                <div className="card-form mobile role-information-container">
                    <InputComponent
                        idInput="nombreRol"
                        className="input-basic"
                        typeInput="text"
                        register={register}
                        label="Nombre"
                        classNameLabel="text-black biggest bold"
                        direction={EDirection.row}
                        errors={errors}
                    />
                    <InputComponent
                        idInput="descripcionRol"
                        className="input-basic"
                        typeInput="text"
                        register={register}
                        label="Descripción"
                        classNameLabel="text-black biggest bold"
                        direction={EDirection.row}
                        errors={errors}
                    />
                </div>
                <label className="text-main biggest bold">
                    Opciones y privilegios de rol
                </label>
                <hr />
                <div>
                    <TransferBoxComponent idInput="accionesRol" data={optionsTransfer} register={register} setValueRegister={setValueRegister} />
                </div>
                <div className="role-action-buttons">
                    <ButtonComponent
                        className="button-main small hover-three"
                        value="Cancelar"
                        type="button"
                        action={onCancel}
                    />
                    <ButtonComponent
                        className="button-main small hover-three"
                        value="Guardar"
                        type="submit"
                    />
                </div>
            </div>
        </FormComponent>
    </Fragment>)
}

export default React.memo(RoleCrudPage);