import React from "react";
import { useWidth } from "../../../common/hooks/use-width";

function WelcomeContainer(): React.JSX.Element {
  const {width} = useWidth()
  return (
    <section className="welcome-container">
      <span className="text-dasboard huge text-center">Bienvenid@ a 
        <img src={
          width >= 1024 ? require('../../../public/images/icons-aplication/aurora-white-logo.svg') 
            : require('../../../public/images/icons-aplication/aurora-purple-logo.svg')
        } alt='aurora'/> 
      </span>
      <span className="text-dasboard large text-center">
        Sistema de información de Sapiencia
      </span>
    </section>
  );
}

export default React.memo(WelcomeContainer);
