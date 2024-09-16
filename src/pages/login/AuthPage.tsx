import { useAppSelector, useAppDispatch } from "app/store/AppStore";
import { login, register } from "entities/session";
import { signInValidate } from "pages/login/model/signInSchema";
import { signUpValidate } from "pages/login/model/signUpSchema";
import SignInForm from "pages/login/ui/SignInForm";
import SignUpForm from "pages/login/ui/SignUpForm";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TValidateFormError } from "shared/lib/ValidateFormHelper";
import styles from "./AuthPage.module.scss";


export const AuthPage = () => {
    const [errorsValid, setErrorsValid] = useState<TValidateFormError>({});
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isAuthInProgress, isAuth, error } = useAppSelector(store => store.session);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(error);
        if (error?.message === "400, user not found") {
            setErrorsValid({ email: "Пользователь с такой почтой не зарегистрирован" })
        }
        if (error?.message === "400, Note: Only defined users succeed registration") {
            setErrorsValid({ email: "Только пользователь с почтой eve.holt@reqres.in может быть зарегистрирован" })
        }
    }, [error]);


    useEffect(() => {
        // Focus Input after error validate
        const errorKey = Object.keys(errorsValid);
        if (errorKey.length > 0) {
            document.getElementById(errorKey[0])?.focus();
        }
    }, [errorsValid])

    const toogleForm = () => {
        setIsLoginForm(is => (!is));
        setErrorsValid({});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        const newError = isLoginForm ? signInValidate.validate(data) : signUpValidate.validate(data);

        if (Object.keys(newError).length === 0) {
            const authData = {
                email: data.email,
                password: data.password
            }
            if (isLoginForm) {
                dispatch(login(authData));
            } else {
                dispatch(register(authData));
            }
        } else {
            setErrorsValid(newError);
        }
    }

    if (isAuth) return <Navigate to="/" replace />

    return (
        <div className={styles.page}>
            {isLoginForm
                ? <SignInForm toogleForm={toogleForm} errors={errorsValid} isAuthInProgress={isAuthInProgress} handleSubmit={handleSubmit} />
                : <SignUpForm toogleForm={toogleForm} errors={errorsValid} isAuthInProgress={isAuthInProgress} handleSubmit={handleSubmit} />}
        </div>
    )
}