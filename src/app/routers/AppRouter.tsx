import { useAppSelector } from "app/store/AppStore";
import { ErrorPage } from "pages/Error/ErrorPage";
import { AuthPage } from "pages/login/AuthPage";
import { TeamPage } from "pages/Team/TeamPage";
import UserPage from "pages/User/UserPage";
import { createBrowserRouter, createHashRouter, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const { isAuth, isAuthInProgress } = useAppSelector(state => state.session);
    if (isAuthInProgress) {
        return <div>Checking auth...</div>
    }
    if (!isAuth) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

// createBrowserRouter заменен для корректной работы Github Page
export const AppRouter = createHashRouter([
    {
        path: "/*",
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TeamPage />
            },
            {
                path: "user/:userId",
                element: <UserPage />
            },
        ]
    },
    {
        path: "/login",
        element: <AuthPage />
    },

]);
