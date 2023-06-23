import React, { useContext } from "react";
import ModalMessageComponent from "../../../common/components/modal-message.component";
import { AppContext } from "../../../common/contexts/app.context";


function WelcomeContainer(): React.JSX.Element {
  const {setMessage} = useContext(AppContext);
  const messagetest = {
    title: "prueba modal",
    description: "soy una prueba",
    show: true,
    OkTitle:"ok mensaje",
    onClickOutClose: true,
  }
  return (
    <section className="welcome-container">
      <span className="text-three huge text-center bold">Bienvenid@ al Sistema de Información</span>
      <span onClick={()=>{
        setMessage(messagetest)
      }} className="text-black large text-center ">
        Breve descripción o texto explicativo sobre funcionalidades del sistema
      </span>
      {/* <button >modal</button> */}
      
    </section>
  );
}

export default React.memo(WelcomeContainer);
