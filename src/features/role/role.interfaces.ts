export interface IRole {
  id?: number;
  name: string;
  description: string;
  aplicationId: number;
  userModify?: string;
  dateModify?: Date;
  userCreate?: string;
  dateCreate?: Date;
}
