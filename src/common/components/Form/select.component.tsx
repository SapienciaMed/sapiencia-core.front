import React, { useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';

interface ISelectProps<T> {
  idInput: string;
  register: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  data?: Array<object>;
  value?: string;
  label?: string;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: FieldErrors<any>;
  onchange?:(event: any)=>void;
}

function LabelElement({ label, idInput, classNameLabel }): React.JSX.Element {
  if (!label) return <></>;
  return (
    <LabelComponent
      htmlFor={idInput}
      className={classNameLabel}
      value={label}
    />
  );
}

function SelectElement({
  idInput,
  className,
  placeholder,
  data,
  value,
  register,
  onchange
}): React.JSX.Element {
  const [selectedCity, setSelectedCity] = useState(value);
  console.log(onchange)
  return (
    <Dropdown {...register(idInput)} value={selectedCity} onChange={(e) => {
      if (onchange) {
        onchange;
        setSelectedCity(e.value);
      }
      setSelectedCity(e.value);
    }} options={data} optionLabel="name" 
      placeholder={placeholder} className={className}  />
  );
}

export function SelectComponent({
  idInput,
  register,
  className = "select-basic",
  placeholder = "Seleccione",
  data = [{}],
  value = null,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors,
  onchange
}: ISelectProps<any>): React.JSX.Element {
  return (
    <div
      className={
        errors[idInput]?.message
          ? `${direction} container-icon_error`
          : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div>
        <SelectElement idInput={idInput} className={className} placeholder={placeholder} data={data} onchange={onchange} value={value} register={register}/>
        {errors[idInput]?.message && <span className="icon-error"></span>}
      </div>
      {errors[idInput]?.message && (
        <p className="error-message bold not-margin-padding">
          {errors[idInput]?.message}
        </p>
      )}
      {children}
    </div>
  );
}
