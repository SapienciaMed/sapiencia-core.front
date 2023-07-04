import React, { Fragment } from 'react'
import { ButtonComponent, FormComponent, InputComponent } from '../../../common/components/Form';
import { EDirection } from '../../../common/constants/input.enum';
import useSytemUser from '../hooks/useSytemUser.hook';
import { camposFormularioConsultarUsuario } from '../../../common/form';
import SelectApplicationComponent from '../../role/components/select-application.component';

function SystemUser() {

  const { errors, watchedFields, reset, onSubmitSearch, register } = useSytemUser()
 
  return (
    <Fragment>
      <div className="main-page full-height">

        <SelectApplicationComponent />

        <div className="card-user">
          <div className="text-black large bold"> Consultar usuario </div>         
          <div className="card-table-user">
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
                disabled={!Object.values(watchedFields).every(Boolean)}
              />
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default React.memo(SystemUser);
