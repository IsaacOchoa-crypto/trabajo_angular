export enum IStatus {
    Created,
    Completed,
    Failed,
    Expired
}

export interface ITodo {
    id?: string;
    content: string;
    status: IStatus;
    description?: string;
    createdAt?: any;
}
