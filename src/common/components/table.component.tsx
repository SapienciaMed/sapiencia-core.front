import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { ITableAction, ITableElement } from "../interfaces/table.interfaces";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import iconView from "../../public/images/icons/icon-view.png";
import iconEdit from "../../public/images/icons/icon-edit.png";
import iconDelete from "../../public/images/icons/icon-delete.png";
import { IPagingData } from "../utils/api-response";
import useCrudService from "../hooks/crud-service.hook";
import { EResponseCodes } from "../constants/api.enum";

interface IProps<T> {
  url: string;
  title?: string;
  columns: ITableElement<T>[];
  actions?: ITableAction<T>[];
  searchItems?: object;
}

interface IRef {
  loadData: (newSearchCriteria?: object) => void;
}

const TableComponent = forwardRef<IRef, IProps<any>>((props, ref) => {
  const { title, columns, actions, url } = props;

  // Declaraciones
  const { post } = useCrudService(null, url);
  useImperativeHandle(ref, () => ({
    loadData: loadData,
  }));

  // States
  const [charged, setCharged] = useState<boolean>(false);
  const [resultData, setResultData] = useState<IPagingData<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [searchCriteria, setSearchCriteria] = useState<object>();

  // Metodo que hace la peticion para realizar la carga de datos
  async function loadData(
    newSearchCriteria?: object,
    currentPage?: number
  ): Promise<void> {
    setLoading(true);

    if (newSearchCriteria) {
      setSearchCriteria(searchCriteria);
    }

    const body = newSearchCriteria || searchCriteria || {};
    const res = await post<IPagingData<any>>(url, {
      ...body,
      page: currentPage || 1,
      perPage: perPage,
    });
    if (res.operation.code === EResponseCodes.OK) {
      setResultData(res.data);
    } else {
      // generar mensaje de error / advetencia
    }
    setLoading(false);
  }

  // Metodo que retorna el icono o nombre de la accion
  function getIconElement(icon: string, element: "name" | "src"): string {
    switch (icon) {
      case "Detail":
        return element == "name" ? "Detalle" : iconView;
      case "Edit":
        return element == "name" ? "Editar" : iconEdit;
      case "Delete":
        return element == "name" ? "Eliminar" : iconDelete;
      default:
        return "";
    }
  }

  // Metodo que genera el elemento del icono
  const ActionComponent = (props: { row: any }): JSX.Element => {
    return (
      <div className="spc-table-action-button">
        {actions.map((action) => (
          <div key={action.icon} onClick={() => action.onClick(props.row)}>
            <img src={getIconElement(action.icon, "src")} alt={action.icon} />
          </div>
        ))}
      </div>
    );
  };

  // Metodo que alamacena el el estado del paginador
  function onPageChange(event: PaginatorPageChangeEvent): void {
    setPerPage(event.rows);
    setFirst(event.first);
    setPage(event.page);
  }

  useEffect(() => {
    if(charged) loadData(undefined, page + 1);
  }, [perPage, first, page])

  useEffect(() => {
    setCharged(true);

    return () => {
      setCharged(false);
    }
  }, [])

  return (
    <div className="spc-common-table">
      {title && <div className="spc-table-title">{title}</div>}

      <DataTable
        className="spc-table"
        value={resultData?.array || []}
        loading={loading}
        scrollable={true}
      >
        {columns.map((col) => (
          <Column
            key={col.fieldName}
            field={col.fieldName}
            header={col.header}
            body={col.renderCell}
          />
        ))}

        {actions && (
          <Column
            style={{ width: actions.length > 2 ? actions.length * 50 : 100 }}
            className="spc-table-actions"
            header={
              <div>
                <div className="spc-header-title">Acciones</div>
                <div className="spc-header-subtitles text-main small">
                  {actions.map((action) => (
                    <div key={action.icon}>
                      {action.customName
                        ? action.customName
                        : getIconElement(action.icon, "name")}
                    </div>
                  ))}
                </div>
              </div>
            }
            body={(row) => <ActionComponent row={row} />}
          />
        )}
      </DataTable>

      <Paginator
        className="spc-table-paginator"
        first={first}
        rows={perPage}
        totalRecords={resultData?.meta?.total || 0}
        rowsPerPageOptions={[10, 20, 30, 100]}
        onPageChange={onPageChange}
      />
    </div>
  );
});

export default React.memo(TableComponent);
