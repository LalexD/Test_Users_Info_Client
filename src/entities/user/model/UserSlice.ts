import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser, IUserState } from 'entities/user/model/types';
import { UserAPI } from 'shared/api';

// Заглушка для данных. В тестовом API нет таких полей
const DEF_ADDITIONAL_DATA_USER = {
    info: `Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.\n
    В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".\n
    Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.`,
    phone: '+7 (954) 333-44-55',
    post: 'Сотрудник'
}

export const getUserById = createAsyncThunk(
    "user/getUser",
    async (id: string, thunkAPI) => {
        let defUserData: IUser = {
            ...initialState.user,
            ...DEF_ADDITIONAL_DATA_USER
        };
        const fetchData = await UserAPI.getUser(id);
        const resData: IUser = {
            ...defUserData,
            ...fetchData
        }
        return resData
    }
)

const initialState: IUserState = {
    user: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        avatar: '',
        isLike: false,
        info: '',
        phone: '',
        post: ''
    },
    loading: false,
    error: null,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            if (!state.loading) return { ...initialState };
        },
        setUserForCache: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getUserById.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload };
                state.loading = false;
            })
    }
})

export const { clearUser, setUserForCache } = UserSlice.actions;

export default UserSlice.reducer