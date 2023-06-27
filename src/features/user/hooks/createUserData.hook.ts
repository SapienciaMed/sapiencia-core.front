import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IUserCreate } from "../../../common/interfaces/user.interfaces";
import { useUserService } from "../../../common/hooks/user-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createUsers } from "../../../common/schemas";

export default function useCreateUserData() {
  /*States*/
  const [genderList, setGenderList] = useState([]);
  const [typeDocumentList, setTypeDocumentList] = useState([]);
  const [deparmentList, setDeparmentList] = useState([]);
  const [deparment, setDeparment] = useState("")
  const [townList, setTownList] = useState([]);
  const [town, setTown] = useState("") 
  const [neighborhoodList, setneighborhoodList] = useState([]);

  /*instances*/
  const { getListByGrouper, getListByParent, getListByGroupers } =
    useGenericListService();
  const resolver = useYupValidationResolver(createUsers);
  const token = window.localStorage.getItem('token');
  const { createUser } = useUserService(token);

  const navigate = useNavigate();

  const { setMessage, authorization } = useContext(AppContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserCreate>({ resolver });

  /*UseEffects*/
  useEffect(() => {
    const groupers = ["GENEROS", "TIPOS_DOCUMENTOS"];
    getListByGroupers(groupers)
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTypeDocumentList(
            response.data
              .filter((grouper) => grouper.grouper == "TIPOS_DOCUMENTOS")
              .map((item) => {
                const list = {
                  name: item.itemCode,
                  value: item.itemCode,
                };
                return list;
              })
          );
          setGenderList(
            response.data
              .filter((grouper) => grouper.grouper == "GENEROS")
              .map((item) => {
                const list = {
                  name: item.itemDescription,
                  value: item.itemCode,
                };
                return list;
              })
          );
        }
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setDeparmentList(response.data.map((item)=>{
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          }))
        }})
      .catch((e) => {});
  }, []);

  useEffect(() => {
    getListByParent({ grouper: "MUNICIPIOS", parentItemCode: deparment })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setTownList(response.data.map((item)=>{
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          }))
        }})
      .catch((err) => {});
  }, [deparment]);

  useEffect(() => {
    getListByParent({ grouper: "BARRIOS", parentItemCode: town })
      .then((response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setneighborhoodList(response.data.map((item)=>{
            const list = {
              name: item.itemDescription,
              value: item.itemCode,
            };
            return list;
          }))
        }})
      .catch((err) => {});
  }, [town]);

  /*Functions*/
  const onSubmitSignIn = handleSubmit(async (data: IUserCreate) => {
    const user = {
      names: data.names,
      lastNames: data.lastNames,
      typeDocument: data.typeDocument,
      numberDocument: data.numberDocument,
      email: data.email,
      password: data.numberDocument,
      userCreate: authorization?.user?.names,
      userModify: authorization?.user?.names,
    };
    const res = await createUser(user).then((response: ApiResponse<IUserCreate>) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setMessage({
          OkTitle: "Aceptar",
          description: "Se ha creado el usuario en el sistema de forma exitosa",
          title: "Crear usuario",
          show: true,
          type: EResponseCodes.OK,
        });
      }}).catch((err) => {
        setMessage({
          type: EResponseCodes.FAIL,
          title: "Crear Usuario",
          description: "hubo problemas creando el usuario",
          show: true,
          OkTitle: "Aceptar",
        });
      });
  });

  const CancelFunction = () => {
    setMessage({
      show: true,
      title: "Crear usuario",
      description: "¿Seguro que desea cancelar la creación de usuario?",
      OkTitle: "Continuar",
      cancelTitle: "Si,Cancelar",
      onCancel() {
        navigate("/");
        setMessage((prev) => ({ ...prev, show: false }));
      },
    });
  };

  return {
    genderList,
    typeDocumentList,
    onSubmitSignIn,
    CancelFunction,
    register,
    setDeparment,
    setTown,
    authorization,
    deparmentList,
    townList,
    neighborhoodList,
    errors,
  };
}
