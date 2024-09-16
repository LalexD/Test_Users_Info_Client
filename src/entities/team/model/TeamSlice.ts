import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUsersPagesState } from 'entities/team/model/types';
import { IUser } from 'entities/user/model/types';
import { UserAPI } from 'shared/api';
import { LocalStorage } from 'shared/lib';


export const getTeamUsers = createAsyncThunk(
    "team/getTeamUsers",
    async (numUser: number, thunkAPI) => {
        const fetchData = await UserAPI.getUsersPage(1, numUser);
        const resData = {
            users: fetchData.data as IUser[],
            isMore: (fetchData.page < fetchData.total_pages),
            page: 1,
            total_pages: fetchData.total_pages,
        }
        // Имитация загрузки лайков вместе с данными пользователей
        const likes = LocalStorage.getLikes();
        resData.users.forEach((user) => {
            user.isLike = likes?.[user.id] ? true : false;
        })

        return resData
    }
)

export const toogleLikeUser = createAsyncThunk(
    "team/toogleLikeUser",
    async (id: string, thunkAPI) => {

        // Имитация отправки на сервер и подтверждения
        const isComplete = true;
        const curLike = LocalStorage.toogleLike(id);

        return { isComplete, curLike, id }
    }
)

const initialState: IUsersPagesState = {
    users: [],
    isMore: false,
    page: 0,
    per_page: 0,
    total_pages: 0,
    loading: false,
    error: null
}

const TeamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeamUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTeamUsers.rejected, (state, action) => {
                console.log(action.error);
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTeamUsers.fulfilled, (state, { payload }) => {
                return { ...state, ...payload, loading: false }
            })
            .addCase(toogleLikeUser.fulfilled, (state, { payload }) => {
                state.users = state.users.map(user => {
                    if (user.id === payload.id) {
                        user.isLike = payload.curLike;
                    }
                    return user
                });
            });
    }
})

export default TeamSlice.reducer