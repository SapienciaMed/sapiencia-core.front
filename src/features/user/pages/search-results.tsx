import React from 'react'
import TableComponent from '../../../common/components/table.component'
import { ITableAction, ITableElement } from '../../../common/interfaces/table.interfaces';
import { IUser } from '../../../common/interfaces/auth.interfaces';

interface IProps{
  tableComponentRef: React.MutableRefObject<any>
}
function SearchResults({ tableComponentRef }: IProps){

  const tableColumns: ITableElement<IUser>[] = [
    {
      fieldName: "numberDocument",
      header: "Doc. de identidad",
    },
    {
      fieldName: "name",
      header: "Nombres y apellidos",
      renderCell: (row) => <>{row.names} {row.lastNames}</>
    },
    {
      fieldName: "email",
      header: "Correo electrónico"
    },
    {
      fieldName: "dateCreate",
      header: "Fecha",
      renderCell: (row) => {
        const currentDate = new Date();
        const result: string = row.profile?.map(item => (new Date(item.dateValidity) > currentDate) && "Vigente").join(", ") || "No asignado";
        return <>{ result }</>
      }
    },
    {
      fieldName: "profile",
      header: "Perfil",
      renderCell(row) {
        return row.profile?.length > 0 ? <> Vigente </> : <> No asignado </>
      },
    }
  ];

  const tableActions: ITableAction<any>[]  = [
    {
      icon: "Detail",
      onClick: (row) => {},
    },
    {
      icon: "Edit",
      onClick: (row) => {},
    },
    {
      icon: "Delete",
      onClick: (row) => {},
    },
  ];

  return (
    <div className='card-user'>
        <div className="card-form">
          <TableComponent
            ref={tableComponentRef}
            url={`${process.env.urlApiAuth}/api/v1/user/search`}
            columns={tableColumns}
            actions={tableActions}
            titleMessageModalNoResult='Consultar usuario'
            isShowModal={true}
          />
        </div>
    </div> 
  )
}

export default React.memo(SearchResults)
