import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ISessionState } from './types';
import { AuthAPI } from 'shared/api';
import { LocalStorage } from 'shared/lib';
import { removeToken } from 'shared/lib/LocalStorageHelper';

export const login = createAsyncThunk(
  "session/login",
  async ({ email, password }: { email: string, password: string }, thunkAPI) => {
    const data = await AuthAPI.login({ email, password });
    const { token } = data;
    if (token) {
      LocalStorage.setToken(token);
    }
    return token
  }
)

export const register = createAsyncThunk(
  "session/register",
  async ({ email, password }: { email: string, password: string }, thunkAPI) => {
    const data = await AuthAPI.register({ email, password });
    const { token } = data;
    if (token) {
      LocalStorage.setToken(token);
    }
    return token
  }
)

export const checkAuth = createAsyncThunk(
  "session/checkAuth",
  async (_, thunkAPI) => {
    const token = LocalStorage.getToken();
    return token
  }
)

export const logout = createAsyncThunk(
  "session/logout",
  async (_, thunkAPI) => {
    LocalStorage.removeToken();
  }
)

const defState: ISessionState = {
  isAuth: false,
  isAuthInProgress: false,
  userInfo: {},
  userToken: null,
  error: null,
}

const initialState: ISessionState = {
  ...defState
}
const localToken = LocalStorage.getToken();
if (localToken) {
  initialState.isAuth = true;
  initialState.userToken = localToken;
}

const SessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      removeToken();
      return defState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthInProgress = false;
        state.error = action.error;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isAuthInProgress = false;
        state.userToken = payload;
        state.isAuth = true;
      })
      .addCase(register.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthInProgress = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isAuthInProgress = false;
        state.userToken = payload;
        state.isAuth = true;
      })
      .addCase(logout.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthInProgress = false;
        state.error = action.error;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        return { ...defState };
      })
      .addCase(checkAuth.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthInProgress = false;
        state.error = action.error;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        if (payload) {
          state.isAuthInProgress = false;
          state.userToken = payload;
          state.isAuth = true;
        } else {
          return { ...defState };
        }

      })
  }
})

export default SessionSlice.reducer