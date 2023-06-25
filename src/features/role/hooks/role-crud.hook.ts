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
import { IRequestRole } from "../../../common/interfaces/role.interface";
import { useForm } from "react-hook-form";
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

export function useRoleData() {
  const [options, setOptions] = useState<IOption[]>([]);
  const [optionsTransfer, setOptionsTransfer] = useState<
    ITransferBoxTemplate[]
  >([]);

  const { authorization, setMessage } = useContext(AppContext);
  const { GetOptions, CreateRole } = useRoleService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(roleValidator);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setValueRegister,
  } = useForm<IRequestRole>({ resolver });

  useEffect(() => {
    GetOptions(1).then((response: ApiResponse<IOption[]>) => {
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
  }, []);

  const onSubmitRole = handleSubmit(async (data: IRoleForm) => {
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
      aplicationId: 1,
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
            onCancel();
            setMessage({});
          }
        });
      } else {
        setMessage({
          title: "Hubo un problema.",
          description: response.operation.message,
          show: true,
          OkTitle: "Aceptar",
          onOk: async () => {
            setMessage({});
          }
        });
      }
    });
  });

  const onCancel = () => {
    navigate("./../");
  };

  return {
    optionsTransfer,
    onSubmitRole,
    onCancel,
    register,
    errors,
    setValueRegister,
  };
}
