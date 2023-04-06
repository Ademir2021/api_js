export interface IUser {
    id?: number | string;
    name: string;
    username: string;
    password: string;
};

export interface ILogin {
    username: string;
}