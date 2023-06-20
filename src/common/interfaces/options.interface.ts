export interface IOption {
    id: number;
    aplicationId: number;
    name: string;
    order: number;
    actions?: IActions[];
}

export interface IActions {
    id: number;
    optionId: number;
    name: string;
    order: number;
    indicator: string;
    url: string | null;
}