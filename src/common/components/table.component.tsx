import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { ITableAction, ITableElement } from "../interfaces/table.interfaces";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DataView } from 'primereact/dataview';
import {
  Paginator,
  PaginatorCurrentPageReportOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPageChangeEvent,
  PaginatorPageLinksOptions,
  PaginatorPrevPageLinkOptions,
  PaginatorRowsPerPageDropdownOptions,
  PaginatorTemplateOptions,
} from "primereact/paginator";
import { IPagingData } from "../utils/api-response";
import useCrudService from "../hooks/crud-service.hook";
import { EResponseCodes } from "../constants/api.enum";
import { classNames } from "primereact/utils";
import * as Icons from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";

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
      setSearchCriteria(newSearchCriteria);
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

  // Metodo que alamacena el el estado del paginador
  function onPageChange(event: PaginatorPageChangeEvent): void {
    setPerPage(event.rows);
    setFirst(event.first);
    setPage(event.page);
  }

  useEffect(() => {
    if (charged) loadData(undefined, page + 1);
  }, [perPage, first, page]);

  useEffect(() => {
    setCharged(true);

    return () => {
      setCharged(false);
    };
  }, []);

  const mobilTemplate = (item) => {
    return (
      <div className="card-grid-item">
        <div className="card-header">
          {columns.map(column => {
            return (
              <div key={item} className="item-value-container">
                <p className="text-black bold">{column.header}</p>
                <p>{item[column.fieldName]}</p>
              </div>
            )
          })}
        </div>
        <div className="card-footer">
          {actions.map((action) => (
            <div key={action.icon} onClick={() => action.onClick(item)}>
              {getIconElement(action.icon, "src")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="spc-common-table">
      {title && <div className="spc-table-title">{title}</div>}

      <Paginator
        className="between spc-table-paginator"
        template={paginatorHeader}
        first={first}
        rows={perPage}
        totalRecords={resultData?.meta?.total || 0}
        onPageChange={onPageChange}
        leftContent={leftContent}
      />

      {
        document.body.offsetWidth > 460 ?
          <DataTable
            className="spc-table full-height"
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
                className="spc-table-actions"
                header={
                  <div>
                    <div className="spc-header-title">Acciones</div>
                  </div>
                }
                body={(row) => <ActionComponent row={row} actions={actions} />}
              />
            )}
          </DataTable>
          :
          <DataView value={resultData?.array || []} itemTemplate={mobilTemplate} rows={5} />
      }
      <Paginator
        className="spc-table-paginator"
        template={paginatorFooter}
        first={first}
        rows={perPage}
        totalRecords={resultData?.meta?.total || 0}
        onPageChange={onPageChange}
      />
    </div>
  );
});


// Metodo que retorna el icono o nombre de la accion
function getIconElement(icon: string, element: "name" | "src") {
  switch (icon) {
    case "Detail":
      return element == "name" ? "Detalle" : <Icons.FaEye className="button grid-button" />;
    case "Edit":
      return element == "name" ? (
        "Editar"
      ) : (
        <Icons.FaPencilAlt className="button grid-button" />
      );
    case "Delete":
      return element == "name" ? (
        "Eliminar"
      ) : (
        <Icons.FaTrashAlt className="button grid-button" />
      );
    default:
      return "";
  }
}

const leftContent = <p className="header-information text-black bold biggest">Resultados de búsqueda</p>

const paginatorHeader: PaginatorTemplateOptions = {
  layout: "CurrentPageReport RowsPerPageDropdown",
  CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
    return (
      <>
        <p className="header-information text-black bold big">
          Total de resultados 
        </p>
        <p className="header-information text-three bold big">
          {options.totalRecords}
        </p>
      </>
    );
  },
  RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
    const dropdownOptions = [
      { label: 10, value: 10 },
      { label: 30, value: 30 },
      { label: 50, value: 50 },
      { label: 100, value: 100 }
    ];

    return (
      <React.Fragment>
        <p className="header-information text-black bold big">
          Registros por página{' '}
        </p>
        <Dropdown value={options.value} className="header-information" options={dropdownOptions} onChange={options.onChange} />
      </React.Fragment>
    );
  },
};

const paginatorFooter: PaginatorTemplateOptions = {
  layout: "PrevPageLink PageLinks NextPageLink",
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-3 table-previus"></span>
      </button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-3 table-next"></span>
      </button>
    );
  },
  PageLinks: (options: PaginatorPageLinksOptions) => {
    if (
      (options.view.startPage === options.page &&
        options.view.startPage !== 0) ||
      (options.view.endPage === options.page &&
        options.page + 1 !== options.totalPages)
    ) {
      const className = classNames(options.className, { "p-disabled": true });

      return (
        <span className={className} style={{ userSelect: "none" }}>
          ...
        </span>
      );
    }

    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
      >
        {options.page + 1}
      </button>
    );
  },
};

// Metodo que genera el elemento del icono
const ActionComponent = (props: { row: any, actions: ITableAction<any>[] }): React.JSX.Element => {
  return (
    <div className="spc-table-action-button">
      {props.actions.map((action) => (
        <div key={action.icon} onClick={() => action.onClick(props.row)}>
          {getIconElement(action.icon, "src")}
        </div>
      ))}
    </div>
  );
};

export default React.memo(TableComponent);
