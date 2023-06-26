import { EResponseCodes } from "../constants/api.enum";

export interface IMessage {
  type?: EResponseCodes;
  title?: string;
  description?: string;
  show?: boolean;
  OkTitle?: string;
  cancelTitle?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onClickOutClose?: boolean;
}

export interface IGenericList {
  id: number;
  grouper: string;
  itemCode: string;
  itemDescription: string;
  parentGrouper?: string;
  parentItemCode?: string;
}


