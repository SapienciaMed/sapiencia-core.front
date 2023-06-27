import {
  useState,
  createContext,
  useMemo,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import { IMessage } from "../interfaces/global.interface";
import { IAuthorization } from "../interfaces/auth.interfaces";
import { IMenuAccess } from "../interfaces/menuaccess.interface";

interface IAppContext {
  authorization: IAuthorization;
  setAuthorization: Dispatch<SetStateAction<IAuthorization>>;
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
  application: IMenuAccess;
  setApplication: Dispatch<SetStateAction<IMenuAccess>>;
}
interface IProps {
  children: ReactElement | ReactElement[];
}

export const AppContext = createContext<IAppContext>({
  authorization: {} as IAuthorization,
  setAuthorization: () => {},
  message: {} as IMessage,
  setMessage: () => {},
  application: {} as IMenuAccess,
  setApplication: () => {}
});

export function AppContextProvider({ children }: IProps) {

  // States
  const [message, setMessage] = useState<IMessage>({} as IMessage);
  const [authorization, setAuthorization] = useState<IAuthorization>(
    {} as IAuthorization
  );
  const [application, setApplication] = useState<IMenuAccess>({} as IMenuAccess);

  const values = useMemo<IAppContext>(() => {
    return {
      authorization,
      setAuthorization,
      message,
      setMessage,
      application,
      setApplication
    };
  }, [message, authorization, application]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
