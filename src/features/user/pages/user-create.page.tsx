import React, { Fragment } from "react";
import { FormComponent } from "../../../common/components/Form/form.component";
import { InputComponent } from "../../../common/components/Form/input.component";
import { EDirection } from "../../../common/constants/input.enum";
import { SelectComponent } from "../../../common/components/Form/select.component";
import { InputGroupComponent } from "../../../common/components/Form/input-group.component";
import { ButtonComponent } from "../../../common/components/Form/button.component";
import useCreateUserData from "../hooks/createUserData.hook";

const CreateUserPage = () => {
  const {
    genderList,
    typeDocumentList,
    onSubmitSignIn,
    CancelFunction,
    register,
    setTown,
    setDeparment,
    errors,
    deparmentList,
    townList,
    neighborhoodList,
  } = useCreateUserData();
  return (
    <Fragment>
      <div className="full-height container-form-grid">
        <div className="container-form">
          <h1 className="text-black huge ml-24px">Crear usuario del sistema</h1>
          <div>
            <FormComponent
              id="createUserForm"
              className="form-signIn"
              action={onSubmitSignIn}
            >
              <div className="grid-form-4-container container-sections-forms ">
                <p className="grid-span-4-columns  text-black large bold mb-5px mt-5px">
                  Datos básicos
                </p>
                <div className="form-group column">
                  <label className="text-black big bold" htmlFor="">
                    Documento de identidad
                  </label>
                  <div className="display-justify-space-between">
                    <SelectComponent
                      idInput="typeDocument"
                      register={register}
                      className="select-basic medium"
                      placeholder="Tipo"
                      data={typeDocumentList ? typeDocumentList : []}
                      value={null}
                      classNameLabel="text-black big bold"
                      direction={EDirection.column}
                      errors={errors}
                    />
                    <InputGroupComponent
                      idInput="numberDocument"
                      className="input-group-basic medium"
                      typeInput="text"
                      register={register}
                      classNameLabel="text-black big bold"
                      direction={EDirection.column}
                      errors={errors}
                      placeholder={""}
                      iconLegend={"No."}
                      containerClassname="ml-5px big"
                    />
                  </div>
                </div>
                <InputComponent
                  idInput="names"
                  className="input-basic medium"
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
                  className="input-basic medium"
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
                  className="input-basic medium"
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
                  className="select-basic medium"
                  placeholder="Seleccionar"
                  label="G&eacute;nero"
                  data={genderList ? genderList : []}
                  value={null}
                  classNameLabel="text-black big bold"
                  direction={EDirection.column}
                  errors={errors}
                />

                <InputComponent
                  idInput="numberphone"
                  className="input-basic medium"
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
                  className="input-basic medium"
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
                <p className="grid-span-4-columns mb-5px mt-5px text-black large bold">
                  Datos de ubicación
                </p>
                <SelectComponent
                  idInput="deparment"
                  register={register}
                  className="select-basic medium"
                  placeholder="Seleccione"
                  label="Departamento"
                  data={deparmentList ? deparmentList : [{}]}
                  setValue={setDeparment}
                  value={null}
                  classNameLabel="text-black big bold"
                  direction={EDirection.column}
                  errors={errors}
                />
                <SelectComponent
                  idInput="town"
                  register={register}
                  className="select-basic medium"
                  placeholder="Seleccione"
                  label="Municipio"
                  data={townList ? townList : [{}]}
                  setValue={setTown}
                  value={null}
                  classNameLabel="text-black big bold"
                  direction={EDirection.column}
                  errors={errors}
                />
                <SelectComponent
                  idInput="neighborhood"
                  register={register}
                  className="select-basic medium"
                  placeholder="Seleccione"
                  label="Barrio - opcional"
                  data={neighborhoodList ? neighborhoodList : [{}]}
                  value={null}
                  classNameLabel="text-black big bold"
                  direction={EDirection.column}
                  errors={errors}
                />
                <InputComponent
                  idInput="address"
                  className="input-basic medium"
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
                      con el procedimiento para la protección de datos
                      personales en el municipio de Medellín.
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
              action={() => CancelFunction()}
            />
            <ButtonComponent
              form="createUserForm"
              value="guardar"
              type="submit"
              className="button-save large hover-three disabled-black"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(CreateUserPage);
