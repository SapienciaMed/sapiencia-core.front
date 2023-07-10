import React, { Fragment, useContext } from 'react'
import { ButtonComponent, FormComponent, InputComponent } from '../../../common/components/Form';
import { EDirection } from '../../../common/constants/input.enum';
import useConsultUser from '../hooks/useConsultUser.hook';
import { camposFormularioConsultarUsuario } from '../../../common/form';
import SelectApplicationComponent from '../../role/components/select-application.component';
import { ITableAction, ITableElement } from '../../../common/interfaces/table.interfaces';
import { IUser } from '../../../common/interfaces/auth.interfaces';
import TableComponent from '../../../common/components/table.component';
import { useNavigate } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';


function ConsultUser() {

  const { errors, tableComponentRef, reset, onSubmitSearch, register } = useConsultUser();
  const navigate = useNavigate();

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
    <Fragment>
      <div className="main-page full-height">
        <SelectApplicationComponent />
        <div className="card-user">
          <div className="text-black large bold"> Usuario </div> 
                  
          <div className="card-table-user">
            <div className="title-area">
              <div className="text-black large bold"> Consultar usuario </div> 

              <div className="title-button text-three large" onClick={() => { navigate("/core/usuarios/crear") }}>
                Crear Usuario <BiPlusCircle/>
              </div>         
            </div>
            <FormComponent id='useQueryForm' className="form-system-user-container" action={onSubmitSearch}>
              {
                camposFormularioConsultarUsuario.map((campo) => (
                  <InputComponent
                    key={campo.id}
                    idInput={campo.idInput}
                    className={campo.className}
                    typeInput={campo.typeInput}
                    register={register}
                    label={campo.label}
                    direction={EDirection.row}
                    classNameLabel={campo.classNameLabel}
                    errors={errors}
                    placeholder={campo.placeholder}
                  />
                ))
              }
            </FormComponent>
          </div>
          <div className="container-button-bot">
            <div className="display-justify-space-between mr-24px">
              <ButtonComponent
                form='useQueryForm'
                value="Limpiar campos"
                type="button"
                className="button-clean-fields bold"
                action={() => reset()}
              />
              <ButtonComponent
                form='useQueryForm'
                value="Buscar"
                type="submit"
                className="button-search"
              />
            </div>
          </div>
          <div className='card-user'>
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
      </div>
    </Fragment>
  )
}

export default React.memo(ConsultUser);
