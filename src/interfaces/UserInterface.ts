import { ReactNode } from "react";

export interface UserInterface {
    [x: string]: ReactNode;
    id: number;
    name: string;
    email: string;
    avatar?: string
}

export interface UsersApiResponse {
    users: UserInterface[];
}

export interface UserApiResponse {
    user: UserInterface;
}
