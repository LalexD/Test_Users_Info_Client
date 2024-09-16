import { SerializedError } from "@reduxjs/toolkit";
import { IUser } from "entities/user/model/types";

export interface IUsersPages {
    users: IUser[],
    page: number,
    per_page: number,
    total_pages: number
}

export interface IUsersPagesState extends IUsersPages {
    loading: boolean,
    isMore: boolean,
    error: null | SerializedError,
}