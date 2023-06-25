import React, { Fragment } from "react";
import { ButtonComponent, FormComponent, InputComponent, TransferBoxComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import { useRoleData } from "../hooks/role-crud.hook";
import SelectApplicationComponent from "../components/select-application.component";

interface IAppProps { }

function RoleCrudPage(props: IAppProps) {
    return (
        <div className="role-form">
            <SelectApplicationComponent />
            <RoleForm />
        </div>
    )
}

function RoleForm() {
    const { optionsTransfer, onSubmitRole, onCancel, register, errors, setValueRegister } = useRoleData();
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