import { SerializedError } from "@reduxjs/toolkit";
import { IUserData } from "shared/api/user/types";

export interface IUser extends IUserData {
    isLike: boolean,
    info: string,
    phone: string,
    post: string
}

export interface IUserState {
    user: IUser,
    loading: boolean,
    error: null | SerializedError,
}