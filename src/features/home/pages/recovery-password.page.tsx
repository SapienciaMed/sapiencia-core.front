import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logoAlcaldiaMedellin from "../../../public/images/logo-alcaldia-black.png";
import logoSapiencia from "../../../public/images/logo-sapiencia.png";
import { EDirection } from "../../../common/constants/input.enum";
import { IRequestRecoveryPassword } from "../../../common/interfaces/auth.interfaces";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";
import {
  FormComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form/index";
import { recoveryPassword } from "../../../common/schemas/index";
import { useNavigate } from "react-router-dom";

import "../../../styles/login.scss";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";

function RecoveryPassword(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <main className="container-grid_recoveryPassword">
      <article className="recoveryPassword-visualization"></article>

      <article className="container-recoveryPassword">
        <div className="container-close">
          <span onClick={() => navigate("../login")}>x</span>
        </div>
        <section className="container-form_recoveryPassword">
          <label className="text-main biggest bold">Recuperar contraseña</label>
          <p className="text-primary big not-margin-padding text-center">
            Por favor ingrese la siguiente información para recuperar su
            contraseña
          </p>
          <FormRecoveryPassword />
        </section>
        <hr />
        <FooterRecoveryPasssword />
      </article>
    </main>
  );
}

const FormRecoveryPassword = (): React.JSX.Element => {
  // react router dom
  const navigate = useNavigate();

  // context
  const { setMessage } = useContext(AppContext);

  // // Servicos
  const { recoveryPassword: recoveryPasswordService } = useAuthService();

  const resolver = useYupValidationResolver(recoveryPassword);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRequestRecoveryPassword>({ resolver });

  // // Metodo que hace la peticion al api
  const onSubmitSignIn = handleSubmit(async (data) => {
    const { data: dataResponse, operation } = await recoveryPasswordService(
      data
    );

    if (operation.code === EResponseCodes.OK) {
      setMessage({
        title: "¡Correo enviado!",
        description: "El correo se ha enviado exitosamente",
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          setMessage({});
          navigate("../login");
        },
        background: true,
      });
    } else {
      setMessage({
        title: "¡Ocurrio un error!",
        description: operation.message,
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          setMessage({});
        },
        background: true,
      });
    }
  });

  return (
    <>
      <FormComponent
        className="form-recoveryPassword"
        id="form-recovery_password"
        action={onSubmitSignIn}
      >
        <InputComponent
          idInput="numberDocument"
          className="input-basic-login"
          typeInput="text"
          register={register}
          label="Documento de identidad"
          classNameLabel="text-primary medium bold"
          direction={EDirection.column}
          errors={errors}
          placeholder={"Número de identificación"}
        />
        <InputComponent
          idInput="email"
          className="input-basic-login"
          typeInput="text"
          register={register}
          label="Correo electronico"
          classNameLabel="text-primary medium bold"
          direction={EDirection.column}
          errors={errors}
          placeholder={"Ingrese email registrado"}
        />
      </FormComponent>
    </>
  );
};

const FooterRecoveryPasssword = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="content-footer_recoveryPassword">
      <div className="container-buttons">
        <span className="bold text-center" onClick={() => navigate("../login")}>
          Cancelar
        </span>
        <ButtonComponent
          className="button-main big hover-three"
          value="Recuperar"
          type="submit"
          form="form-recovery_password"
        />
      </div>
      <div className="footer-img">
        <img className="img-sapiencia" src={logoSapiencia} alt="Sapiencia" />
        <img
          className="img-alcaldia"
          src={logoAlcaldiaMedellin}
          alt="Alcaldia de medellin"
        />
      </div>
    </div>
  );
};

export default React.memo(RecoveryPassword);
