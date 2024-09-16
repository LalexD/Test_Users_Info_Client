import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer } from 'entities/session'
import { teamReducer } from 'entities/team'
import { userReducer } from 'entities/user'
import { useDispatch, useSelector, useStore } from 'react-redux'

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        team: teamReducer,
        user: userReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()