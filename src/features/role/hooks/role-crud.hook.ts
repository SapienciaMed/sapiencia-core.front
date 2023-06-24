import { useEffect, useState } from "react";
import useRoleService from "./role-service.hook";
import { IOption } from "../../../common/interfaces/options.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { ITransferBoxTemplate, ITransferBoxChildren } from "../../../common/interfaces/transfer-box.interface";

export function useRoleData() {
    const [ options, setOptions] = useState<IOption[]>([]);
    const [ optionsTransfer , setOptionsTransfer ] = useState<ITransferBoxTemplate[]>([]);

    const { GetOptions } = useRoleService();

    useEffect(() => {
        GetOptions(1).then((response: ApiResponse<IOption[]>) => {
            if (response) {
                const optionResponse: ITransferBoxTemplate[] = response.data.map((item): ITransferBoxTemplate =>  {
                    return {
                        key: `${item.id}`,
                        label: item.name,
                        id: item.id,
                        children: item.actions ? item.actions.map((child): ITransferBoxChildren => ({ 
                            key: `${item.id}-${child.id}`, 
                            label: child.name,
                            id: child.id,
                            parentId: item.id
                        })) : null,
                    };
                });
                setOptionsTransfer(optionResponse);
                setOptions(response.data);
            }
        });
    }, []);

    return { options, optionsTransfer };
}