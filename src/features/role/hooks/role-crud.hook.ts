import { useContext, useEffect, useState } from "react";
import useRoleService from "./role-service.hook";
import {
  IActions,
  IOption,
} from "../../../common/interfaces/options.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import {
  ITransferBoxTemplate,
  ITransferBoxChildren,
} from "../../../common/interfaces/transfer-box.interface";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { roleValidator } from "../../../common/schemas";
import { IRequestRole, IRole } from "../../../common/interfaces/role.interface";
import { set, useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";

interface IRoleForm {
  nombreRol: string;
  descripcionRol: string;
  accionesRol: {
    available: ITransferBoxTemplate[];
    selected: ITransferBoxTemplate[];
  };
}

export function useRoleData(roleId: string) {
  const [options, setOptions] = useState<IOption[]>([]);
  const [roleData, setRoleData] = useState<IRole>(null);
  const [optionsTransfer, setOptionsTransfer] = useState<
    ITransferBoxTemplate[]
  >([]);
  const [transferAvailableData, setTransferAvailableData] = useState<
    ITransferBoxTemplate[]
  >([]);
  const [transferSelectedData, setTransferSelectedData] = useState<
    ITransferBoxTemplate[]
  >([]);

  const { authorization, setMessage, application } = useContext(AppContext);
  const { GetOptions, CreateRole, UpdateRole, GetRole } = useRoleService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(roleValidator);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
  } = useForm<IRequestRole>({ resolver });

  useEffect(() => {
    if (roleId) {
      GetRole(parseInt(roleId)).then(response => {
        if (response.operation.code === EResponseCodes.OK) {
          setRoleData(response.data);
        };
      });
    }
  }, [roleId]);

  useEffect(() => {
    if(!roleData) return;
    const roleActions = roleData.actions.map(action => action);
    const optionsAvailableTransfer: ITransferBoxTemplate[] = [];
    const optionsSelectedTransfer: ITransferBoxTemplate[] = [];
    optionsTransfer.forEach(obj => {
      const filteredChildren = obj.children.filter(child => {
        return roleActions.some(item => item.id === child.id);
      });

      if (filteredChildren.length > 0) {
        optionsSelectedTransfer.push({
          ...obj,
          children: filteredChildren
        });
      }
      if (filteredChildren.length < obj.children.length) {
        optionsAvailableTransfer.push({
          ...obj,
          children: obj.children.filter(child => {
            return !filteredChildren.some(item => item.key === child.key);
          })
        });
      }
    });
    setValueRegister("nombreRol", roleData.name);
    setValueRegister("descripcionRol", roleData.description);
    setTransferAvailableData(optionsAvailableTransfer);
    setTransferSelectedData(optionsSelectedTransfer);
  }, [roleData, optionsTransfer]);

  useEffect(() => {
    if (!application.id) return;
    GetOptions(application.id).then((response: ApiResponse<IOption[]>) => {
      if (response) {
        const optionResponse: ITransferBoxTemplate[] = response.data.map(
          (item): ITransferBoxTemplate => {
            return {
              key: `${item.id}`,
              label: item.name,
              id: item.id,
              children: item.actions
                ? item.actions.map(
                  (child): ITransferBoxChildren => ({
                    key: `${item.id}-${child.id}`,
                    label: child.name,
                    id: child.id,
                    parentId: item.id,
                  })
                )
                : null,
            };
          }
        );
        setOptionsTransfer(optionResponse);
        setOptions(response.data);
      }
    });
  }, [application]);

  const onSubmitNewRole = handleSubmit(async (data: IRoleForm) => {
    setMessage({
      title: "Guardar",
      description: "¿Estas segur@ de guardar la información en el sistema?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      show: true,
      onCancel: () => {
        setMessage({});
      },
      onOk: () => {
        const actionsSelected: IActions[] = [];
        data.accionesRol.selected.forEach((item) => {
          const optionSelected = options.find((option) => option.id === item.id);
          optionSelected.actions
            .filter((object) =>
              item.children.some((filtro) => object.id === filtro.id)
            )
            .forEach((action) => actionsSelected.push(action));
        });
        CreateRole({
          name: data.nombreRol,
          description: data.descripcionRol,
          aplicationId: application.id,
          userCreate: authorization.user.numberDocument,
          actions: actionsSelected,
        }).then((response) => {
          if (response.operation.code === EResponseCodes.OK) {
            setMessage({
              title: "¡Se ha completado el proceso!",
              description: "Opciones y privilegios de rol, agregados a la lista correctamente",
              show: true,
              OkTitle: "Aceptar",
              onOk: () => {
                onCancelNew();
                setMessage({});
              },
              background: true
            });
          } else {
            setMessage({
              title: "Hubo un problema.",
              description: response.operation.message,
              show: true,
              OkTitle: "Aceptar",
              onOk: () => {
                setMessage({});
              },
              background: true
            });
          }
        });
      },
      background: true
    });
  });

  const onSubmitEditRole = handleSubmit(async (data: IRoleForm) => {
    setMessage({
      title: "Editar",
      description: "¿Estas segur@ de guardar la información en el sistema?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      show: true,
      onCancel: () => {
        setMessage({});
      },
      onOk: () => {
        const actionsSelected: IActions[] = [];
        data.accionesRol.selected.forEach((item) => {
          const optionSelected = options.find((option) => option.id === item.id);
          optionSelected.actions
            .filter((object) =>
              item.children.some((filtro) => object.id === filtro.id)
            )
            .forEach((action) => actionsSelected.push(action));
        });
        UpdateRole(parseInt(roleId), {
          name: data.nombreRol,
          description: data.descripcionRol,
          aplicationId: application.id,
          userModify: authorization.user.numberDocument,
          actions: actionsSelected,
        }).then((response) => {
          if (response.operation.code === EResponseCodes.OK) {
            setMessage({
              title: "¡Se ha completado el proceso!",
              description: "Opciones y privilegios de rol, agregados a la lista correctamente",
              show: true,
              OkTitle: "Aceptar",
              onOk: () => {
                onCancelEdit();
                setMessage({});
              },
              background: true
            });
          } else {
            setMessage({
              title: "Hubo un problema.",
              description: response.operation.message,
              show: true,
              OkTitle: "Aceptar",
              onOk: () => {
                setMessage({});
              },
              background: true
            });
          }
        });
      },
      background: true
    });
  });

  const onCancelNew = () => {
    navigate("./../");
  };

  const onCancelEdit = () => {
    navigate("./../../");
  };

  return {
    optionsTransfer,
    onSubmitNewRole,
    onSubmitEditRole,
    onCancelNew,
    onCancelEdit,
    register,
    errors,
    setValueRegister,
    roleData,
    transferAvailableData,
    transferSelectedData
  };
}
