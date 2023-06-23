import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logoAlcaldiaMedellin from "../../../public/images/logo-alcaldia-black.png";
import logoSapiencia from "../../../public/images/logo-sapiencia.png";
import { EDirection } from "../../../common/constants/input.enum";
import { IRequestRecoveryPassword } from "../../../common/interfaces/auth.interfaces";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {
  FormComponent,
  InputShowPassword,
  ButtonComponent,
} from "../../../common/components/Form/index";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

import { changePassword } from "../../../common/schemas/index";

import "../../../styles/login.scss";

function ChangePassword({ action }): React.JSX.Element {
  const resolver = useYupValidationResolver(changePassword);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRequestRecoveryPassword>({ resolver });

  // // Metodo que hace la peticion al api
  const onSubmitSignIn = handleSubmit(async (data) => {
    await action(data);
  });

  return (
    <main className="container-grid_changePassword">
      <article className="changePassword-visualization"></article>

      <article className="container-changePassword">
        <section className="container-form_changePassword">
          <label className="text-main biggest bold">Cambiar contraseña</label>
          <p className="text-primary big not-margin-padding text-center">
            Por favor digite la siguiente información para cambiar su contraseña
          </p>
          <FormComponent
            className="form-changePassword"
            id="form-changePassword"
            action={onSubmitSignIn}
          >
            <InputShowPassword
              idInput="password"
              className="input-basic"
              register={register}
              label="Nueva contraseña"
              classNameLabel="text-primary medium bold"
              direction={EDirection.column}
              errors={errors}
              placeholder={"Contraseña nueva"}
            />
            <InputShowPassword
              idInput="confirmPassword"
              className="input-basic"
              register={register}
              label="Confirmación"
              classNameLabel="text-primary medium bold"
              direction={EDirection.column}
              errors={errors}
              placeholder={"Confirmar contraseña"}
            />
          </FormComponent>
        </section>
        <div className="validations-info">
          <div className="msg-info_validation">
            <GiCheckMark color="#a71989" fontSize={"15px"} />
            <p className="text-primary medium not-margin-padding">
              8 caracteres como minimo
            </p>
          </div>
          <div className="msg-info_validation">
            <GiCheckMark color="#a71989" fontSize={"15px"} />
            <p className="text-primary medium not-margin-padding">Un numero</p>
          </div>
        </div>
        <hr />
        <FooterRecoveryPasssword />
      </article>
    </main>
  );
}

const FooterRecoveryPasssword = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="content-footer_changePassword">
      <div className="container-buttons">
        <span className="bold text-center" onClick={() => navigate("../login")}>
          Cancelar
        </span>
        <ButtonComponent
          className="button-main big hover-three"
          value="Cambiar"
          type="submit"
          form="form-changePassword"
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

export default React.memo(ChangePassword);
