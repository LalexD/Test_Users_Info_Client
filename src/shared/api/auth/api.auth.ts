import { END_POINT, POST } from "shared/api/api.base"

export const login = ({ email, password }: { email: string, password: string }) => {
    return POST(`${END_POINT.LOGIN}`, { email, password });
}

export const register = ({ email, password }: { email: string, password: string }) => {
    return POST(`${END_POINT.REGISTER}`, { email, password });
}

export const logout = () => {

}

export const refreshToken = () => {

}
