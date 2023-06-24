import React, { useEffect, useRef } from "react";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { IRole } from "../role.interfaces";
import TableComponent from "../../../common/components/table.component";
import iconCreate from "../../../public/images/icons/icon-create.png";
import { useNavigate } from "react-router-dom";

interface IAppProps { }

function RoleListPage(props: IAppProps) {
  // Declaraciones
  const tableComponentRef = useRef(null);
  const navigate = useNavigate();

  // Effect que inicia la carga de datos
  useEffect(() => {
    loadTableData();
  }, []);

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
        console.log(row);
      },
    },
    {
      icon: "Edit",
      onClick: (row) => {
        console.log(row);
      },
    },
    {
      icon: "Delete",
      onClick: (row) => {
        console.log(row);
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
