import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import logoAlcaldiaMedellin from "../../../public/images/logo-alcaldia-black.png";
import logoSapiencia from "../../../public/images/logo-sapiencia.png";

import { EDirection } from "../../../common/constants/input.enum";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IRequestSignIn } from "../../../common/interfaces/auth.interfaces";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";

import {
  FormComponent,
  InputComponent,
  ButtonComponent,
  InputShowPassword,
} from "../../../common/components/Form/index";

import { loginValidator } from "../../../common/schemas/index";

import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate, Link } from "react-router-dom";

import "../../../styles/login.scss";

interface IVersionComponente {
  version: string;
}

interface IFailedSignIn {
  show: boolean;
  msg: string;
}

function LoginPage(): React.JSX.Element {
  return (
    <main className="container-grid_login">
      <article className="login-visualization"></article>

      <article className="login-signIn">
        <section className="container-logos_signIn">
          <img src={logoAlcaldiaMedellin} alt="Alcaldia de medellin" />
          <img src={logoSapiencia} alt="Sapiencia" />
          <hr />
        </section>

        <section className="container-form_signIn">
          <label className="text-main text-center medium bold">
            Ingrese sus datos para iniciar sesion
          </label>

          <div className="content-form_signIn">
            <FormSignIn />
            <VersionSapiencia version={"1.0.0"} />
          </div>
        </section>
      </article>
    </main>
  );
}

const FormSignIn = (): React.JSX.Element => {
  // Servicos
  const { signIn } = useAuthService();
  const navigate = useNavigate();

  const { setAuthorization } = useContext(AppContext);
  const resolver = useYupValidationResolver(loginValidator);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRequestSignIn>({ resolver });

  // States
  const [objectSignInFailed, setObjectSignInFailed] = useState<IFailedSignIn>({
    show: false,
    msg: "",
  });

  useEffect(() => {
    if (errors.numberDocument?.message || errors.password?.message)
      setObjectSignInFailed({
        show: false,
        msg: "",
      });
  }, [errors.numberDocument?.message, errors.password?.message]);

  // Metodo que hace la peticion al api
  const onSubmitSignIn = handleSubmit(async (data) => {
    const { data: dataResponse, operation } = await signIn(data);

    if (operation.code === EResponseCodes.OK) {
      localStorage.setItem("token", dataResponse.token);
      setAuthorization(dataResponse.authorization);
      navigate("/");
    } else {
      setObjectSignInFailed({
        show: true,
        msg: operation.message,
      });
    }
  });

  return (
    <>
      <FormComponent className="form-signIn" action={onSubmitSignIn}>
        <InputComponent
          idInput="numberDocument"
          className="input-basic-login"
          typeInput="text"
          register={register}
          label="Número de identificación"
          classNameLabel="text-primary medium bold"
          direction={EDirection.column}
          errors={errors}
          placeholder={"Tu número de documento"}
        />
        <InputShowPassword
          idInput="password"
          className="input-basic-login"
          register={register}
          label="Digite su contraseña"
          classNameLabel="text-primary medium bold"
          direction={EDirection.column}
          errors={errors}
          placeholder={"Tu contraseña"}
        >
          {objectSignInFailed.show && (
            <p className="error-message not-margin-padding bold">
              {objectSignInFailed.msg}
            </p>
          )}
        </InputShowPassword>
        <div className="content-remember_data">
          <input type="checkbox" className="checkbox-basic" />
          <label className="text-primary medium">
            Recordar datos de acceso
          </label>
        </div>
        <div className="content-finally_form">
          <ButtonComponent
            className="button-main small hover-three"
            value="Ingresar"
            type="submit"
          />
          <div className="recovery-password">
            <p className="text-primary medium not-margin-padding">
              ¿Olvidó su contraseña?
            </p>
            <Link className="a-main medium bold" to={"../recovery-password"}>
              Recupérala AQUÍ
            </Link>
          </div>
        </div>
      </FormComponent>
    </>
  );
};

const VersionSapiencia = ({
  version,
}: IVersionComponente): React.JSX.Element => {
  return (
    <div className="content-version">
      <p className="text-black tiny weight-900 not-margin-padding">
        Powered by:
      </p>
      <p className="text-primary not-margin-padding tiny bold">Sapiencia</p>
      <p className="text-main weight-900 not-margin-padding tiny bold">
        {version}
      </p>
    </div>
  );
};

export default React.memo(LoginPage);
