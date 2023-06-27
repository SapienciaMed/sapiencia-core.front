import React, { useContext, useEffect, useRef } from "react";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { IRole } from "../../../common/interfaces/role.interface";
import TableComponent from "../../../common/components/table.component";
import iconCreate from "../../../public/images/icons/icon-create.png";
import { useNavigate } from "react-router-dom";
import SelectApplicationComponent from "../components/select-application.component";
import { AppContext } from "../../../common/contexts/app.context";
import useRoleService from "../hooks/role-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import DetailsComponent from "../../../common/components/details.component";

interface IAppProps { }

function RoleListPage(props: IAppProps) {
  // Declaraciones
  const tableComponentRef = useRef(null);
  const navigate = useNavigate();
  const { application, setMessage } = useContext(AppContext);
  const { DeleteRole } = useRoleService();

  // Effect que inicia la carga de datos
  useEffect(() => {
    if(application.id) loadTableData({aplicationId: application.id});
  }, [application]);

  // Constantes
  const tableColumns: ITableElement<IRole>[] = [
    {
      fieldName: "id",
      header: "Codigo",
      renderCell: (row) => <b>{row.id}</b>,
      mobile: false
    },
    {
      fieldName: "name",
      header: "Nombre",
      mobile: true
    },
    {
      fieldName: "description",
      header: "Descriptión",
      mobile: false
    },
  ];
  const tableActions: ITableAction<IRole>[] = [
    {
      icon: "Detail",
      onClick: (row) => {
        const rows = [
          {
            title: "Id",
            value: `${row.id}`
          },
          {
            title: "Nombre",
            value: `${row.name}`
          },
          {
            title: "Descripción",
            value: `${row.description}`
          }
        ]
        setMessage({
          title: "Detalles",
          show: true,
          OkTitle: "Aceptar",
          description: <DetailsComponent rows={rows} />
        })
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`./edit/${row.id}`);
      },
    },
    {
      icon: "Delete",
      onClick: (row) => {
        setMessage({
          title: "Eliminar registro",
          description: `¿Estas seguro que deseas eliminar el rol "${row.name}"?`,
          show: true,
          cancelTitle: "Cancelar",
          OkTitle: "Aceptar",
          onCancel: () => {
            setMessage({});
          },
          onOk: () => {
            DeleteRole(row.id).then(response => {
              if(response.operation.code === EResponseCodes.OK) {
                setMessage({
                  title: "¡Registro eliminado!",
                  show: true,
                  OkTitle: "Aceptar",
                  onOk: () => {
                    setMessage({});
                  }
                })
                loadTableData({aplicationId: application.id})
              }
            });
            
          }
        })
      },
    },
  ];

  // Metodo que ejecuta la accion de carga del paginado
  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  return (
    <div className="main-page full-height">
      <SelectApplicationComponent />
      <div className="card-table">
        <div className="title-area">
          <div className="text-main biggest bold">Consultar rol</div>

          <div className="title-button text-main big" onClick={() => {navigate("./create")}}>
            Crear <img src={iconCreate} alt="crear" />
          </div>
        </div>

        <TableComponent
          ref={tableComponentRef}
          url={`${process.env.urlApiAuth}/api/v1/role/get-paginated`}
          columns={tableColumns}
          actions={tableActions}
        />
      </div>
    </div>
  );
}
export default React.memo(RoleListPage);
