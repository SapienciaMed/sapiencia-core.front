import * as yup from "yup";

export const loginValidator = yup.object({
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .max(15, "Solo se permiten 15 caracteres")
    .required("El numero de documento es obligatorio"),
  password: yup
    .string()
    .min(7, "Ingrese al menos 7 caracteres")
    .required("La contraseña es obligatoria"),
});

export const recoveryPassword = yup.object({
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .required("El numero de documento es obligatorio"),
  email: yup
    .string()
    .email("Correo no valido")
    .required("El correo es obligatorio"),
});

export const createUsers = yup.object({
  names: yup.string().required("El nombre de usuario es obligatorio"),
  lastNames: yup.string().required("El apellido del usuario es obligatorio"),
  typeDocument: yup.string().required("El tipo de documento es obligatorio"),
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten numeros")
    .required("El numero de documento es obligatorio"),
  email: yup
    .string()
    .email("Correo no valido")
    .required("El correo es obligatorio"),
  gender: yup.string().required("El género es obligatorio"),
  numberphone: yup.string().required("El número de contacto es obligatorio"),
  deparment: yup.string().required("El departamento es obligatorio"),
  town: yup.string().required("El municipio es obligatorio")
  
});

export const changePassword = yup.object({
  password: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .required("La contraseña es obligatoria."),
  confirmPassword: yup
    .string()
    .min(8, "Ingrese al menos 8 caracteres")
    .required("La contraseña es obligatoria.")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .oneOf(
      [yup.ref("password")],
      "Las contraseñas no coinciden, por favor verificar la información."
    ),
});

export const roleValidator = yup.object({
  nombreRol: yup
  .string()
  .required("Inserta un nombre"),
  descripcionRol: yup
  .string()
  .required("Inserta una descripción")
});

export const systemUserValidator = yup.object({
  documentNumber: yup
  .number()
  .typeError("Solo se permiten numeros")
  .required("Inserta un número de documento"),
  names: yup
  .string()
  .required("Inserta un nombre"),
  lastNames: yup
  .string()
  .required("Inserta un apellido"),
  email: yup
  .string()
  .email("Correo no valido")
  .required("El correo es obligatorio"),
  profile: yup
  .string()
  .required("Inserta un perfil"),
})