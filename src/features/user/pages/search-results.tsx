
import React, { useContext, useEffect, useRef } from 'react'
import TableComponent from '../../../common/components/table.component'
import { ITableAction } from '../../../common/interfaces/table.interfaces';
import { IRole } from '../../../common/interfaces/role.interface';
import { AppContext } from '../../../common/contexts/app.context';

function SearchResults(){

  const tableComponentRef = useRef(null);
  const { application, setMessage } = useContext(AppContext);

  useEffect(() => {
    if(application.id) console.log({aplicationId: application.id});
  }, [application]);

  const tableColumns = [
    {
      fieldName: "idDocument",
      header: "Doc. de identidad",
    },
    {
      fieldName: "name",
      header: "Nombres y apellidos"
    },
    {
      fieldName: "email",
      header: "Correo electrónico"
    },
    {
      fieldName: "dateOfCreation",
      header: "Fecha creación"
    },
    {
      fieldName: "profile",
      header: "Perfil"
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

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  return (
   <div className='card-user'>
      <div className="card-form">
        <TableComponent
          // ref={tableComponentRef}
          url={`${process.env.urlApiAuth}/api/v1/role/get-paginated`}
          columns={tableColumns}
          actions={tableActions}
        />
      </div>
   </div> 
  )
}

export default React.memo(SearchResults)
