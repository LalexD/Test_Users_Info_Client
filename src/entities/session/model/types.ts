import { SerializedError } from "@reduxjs/toolkit"

export interface ISession {
    userInfo: {},
    userToken: string | null,
}

export interface ISessionState extends ISession {
    isAuth: boolean,
    isAuthInProgress: boolean,
    error: null | SerializedError,
}