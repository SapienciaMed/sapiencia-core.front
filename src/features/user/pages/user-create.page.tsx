import React, { Fragment, useContext, useState } from "react";
import { FormComponent } from "../../../common/components/Form/form.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createUsers } from "../../../common/schemas";
import { EDirection } from "../../../common/constants/input.enum";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { SelectComponent } from "../../../common/components/Form/select.component";
import { InputGroupComponent } from "../../../common/components/Form/input-group.component";
import { ButtonComponent } from "../../../common/components/Form/button.component";
import { IUserCreate } from "../../../common/interfaces/user.interfaces";
import { useUserService } from "../../../common/hooks/user-service.hook";
import { AppContext } from "../../../common/contexts/app.context";

interface IFailedSignIn {
  show: boolean;
  msg: string;
}

const CreateUserPage = () => {
  const [objectSignInFailed, setObjectSignInFailed] = useState<IFailedSignIn>({
    show: false,
    msg: "",
  });
  const resolver = useYupValidationResolver(createUsers);
  const { createUser } = useUserService();
  const { setMessage, authorization } = useContext(AppContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserCreate>({ resolver });

  const onSubmitSignIn = handleSubmit(async (data: IUserCreate) => {
    console.log(data);
    console.log(authorization);
    const user = {
      names: data.names,
      lastNames: data.lastNames,
      typeDocument: data.typeDocument,
      numberDocument: data.numberDocument,
      email: data.email,
      password: data.numberDocument,
      userCreate: "test",
      userModify: "test",
    };
    const res = await createUser(user);
    if (res) {
      setMessage({
        cancelTitle: "cancelar",
        OkTitle: "ok",
        description: "Usuario creado con exito",
        title: "creación de usuario",
        show: true,
        type: EResponseCodes.OK,
      });
    } else {
      alert("algo fallo");
    }
  });
  return (
    <Fragment>
      <div className="container-form">
        <h1 className="text-black huge ml-24px">Crear usuario del sistema</h1>
        <div>
          <FormComponent
            id="createUserForm"
            className="form-signIn"
            action={onSubmitSignIn}
          >
            <div className="grid-form-4-container container-sections-forms ">
              <legend className="grid-span-4-columns">{"Datos básicos"}</legend>
              <div className="form-group column">
                <label className="text-black big bold" htmlFor="">
                  Documento de identidad
                </label>
                <div className="display-justify-space-between">
                  <SelectComponent
                    idInput="typeDocument"
                    register={register}
                    className="select-basic"
                    placeholder="Tipo"
                    data={[{ name: "CC", value: "CC" }]}
                    value={null}
                    classNameLabel="text-black big bold"
                    direction={EDirection.column}
                    errors={errors}
                  />
                  <InputGroupComponent
                    idInput="numberDocument"
                    className="input-group-basic"
                    typeInput="text"
                    register={register}
                    classNameLabel="text-black big bold"
                    direction={EDirection.column}
                    errors={errors}
                    placeholder={""}
                    iconLegend={"No."}
                    containerClassname="ml-5px"
                  />
                </div>
              </div>
              <InputComponent
                idInput="names"
                className="input-basic"
                typeInput="text"
                label="Nombres"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />

              <InputComponent
                idInput="lastNames"
                className="input-basic"
                typeInput="text"
                label="Apellidos"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />

              <InputComponent
                idInput="email"
                className="input-basic"
                typeInput="email"
                label="Correo electr&oacute;nico"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />

              <SelectComponent
                idInput="gender"
                register={register}
                className="select-basic"
                placeholder="Seleccionar"
                label="G&eacute;nero"
                data={[{}]}
                value={null}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
              />

              <InputComponent
                idInput="numberphone"
                className="input-basic"
                typeInput="phone"
                label="N&uacute;mero de contacto"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />

              <InputComponent
                idInput="cellphoneNumber"
                className="input-basic"
                typeInput="phone"
                label="Celular-opcional"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />
            </div>

            <div className="grid-form-4-container container-sections-forms">
              <legend className="grid-span-4-columns">
                {"Datos de ubicación"}
              </legend>
              <SelectComponent
                idInput="deparment"
                register={register}
                className="select-basic"
                placeholder="Seleccione"
                label="Departamento"
                data={[{}]}
                value={null}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
              />
              <SelectComponent
                idInput="town"
                register={register}
                className="select-basic"
                placeholder="Seleccione"
                label="Municipio"
                data={[{}]}
                value={null}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
              />
              <SelectComponent
                idInput="neighborhood"
                register={register}
                className="select-basic"
                placeholder="Seleccione"
                label="Barrio - opcional"
                data={[{ name: "Cédula de ciudadanía", value: "1" }]}
                value={null}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
              />
              <InputComponent
                idInput="address"
                className="input-basic"
                typeInput="number"
                label="Direcci&oacute;n"
                register={register}
                classNameLabel="text-black big bold"
                direction={EDirection.column}
                errors={errors}
                placeholder={""}
              />

              <div className="grid-span-4-columns">
                <div className="content-remember_data">
                  <input type="checkbox" className="checkbox-basic" />
                  <label className="text-primary medium">
                    Acepto las políticas de uso del portal y estoy de acuerdo
                    con el procedimiento para la protección de datos personales
                    en el municipio de Medellín.
                  </label>
                </div>
                <div className="content-remember_data ">
                  <input type="checkbox" className="checkbox-basic" />
                  <label className="text-primary medium">
                    Autorizo el municipio de Medellín para el envío de correos
                    electrónicos de documentos de cobro, comunicaciones
                    oficiales, actos administrativos, trámites y servicios.
                  </label>
                </div>
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
      <div className="container-button-bot">
        <div className="display-justify-space-between mr-24px">
          <ButtonComponent
            form="createUserForm"
            value="cancelar"
            type="button"
            className="button-cancel-save large hover-three disabled-black"
            action={() => alert("cancelar")}
            disabled={true}
          />
          <ButtonComponent
            form="createUserForm"
            value="guardar"
            type="submit"
            className="button-save large hover-three disabled-black"
            disabled={true}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(CreateUserPage);
