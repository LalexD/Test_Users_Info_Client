import { END_POINT, GET } from "shared/api/api.base"
import { IUserData, IUsersPageData } from "shared/api/user/types";


export const getUsersPage = (page: number, perPage: number = 8): Promise<IUsersPageData> => {
    return GET(`${END_POINT.TEAM_USERS}?page=${page}&per_page=${perPage}`);
}

export const getUser = (id: string): Promise<IUserData> => {
    return GET(`${END_POINT.USER}/${id}`).then(data => data.data);
};
