export interface IMenuAccess {
  id: number;
  aplicationId: number;
  name: string;
  url: string | null;
  topMenuAccessId: number | null;
  showInHome: boolean;
  order: number;
  actionIndicator: string | null;
}
