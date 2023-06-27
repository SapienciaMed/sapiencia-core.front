import React, { Fragment } from "react";
import { ButtonComponent, FormComponent, InputComponent, TransferBoxComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import { useRoleData } from "../hooks/role-crud.hook";
import SelectApplicationComponent from "../components/select-application.component";
import { useParams } from "react-router-dom";

interface IAppProps {
    action: "new" | "edit";
 }

function RoleCrudPage({ action }: IAppProps) {
    return (
        <div className="role-form">
            <SelectApplicationComponent />
            <RoleForm action={action}/>
        </div>
    )
}

function RoleForm({ action }: IAppProps) {
    const { id: roleId } = useParams();
    const { optionsTransfer, onSubmitNewRole, onSubmitEditRole, onCancelNew, onCancelEdit, register, errors, setValueRegister, roleData, transferAvailableData, transferSelectedData } = useRoleData(roleId);
    return (<Fragment>
        <FormComponent action={action == "new" ? onSubmitNewRole : onSubmitEditRole}>
            <div className="card-form">
                <label className="text-main biggest bold">
                    {action == "new" ? "Crear rol" : "Editar rol"}
                </label>
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
                        value={roleData?.name}
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
                        value={roleData?.description}
                    />
                </div>
                <label className="text-main biggest bold label-transfer-role">
                    Opciones y privilegios de rol
                </label>
                <hr />
                <div>
                    <TransferBoxComponent idInput="accionesRol" data={optionsTransfer} register={register} setValueRegister={setValueRegister} available={transferAvailableData} selected={transferSelectedData}/>
                </div>
                <div className="role-action-buttons">
                    <ButtonComponent
                        className="button-main small hover-three"
                        value="Cancelar"
                        type="button"
                        action={action == "new" ? onCancelNew : onCancelEdit}
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