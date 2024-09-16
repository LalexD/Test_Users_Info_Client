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
    const [errors, setErrors] = useState<TValidateFormError>({});
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isAuthInProgress, isAuth } = useAppSelector(store => store.session);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const errorKey = Object.keys(errors);
        if (errorKey.length > 0) {
            document.getElementById(errorKey[0])?.focus();
        }
    }, [errors])

    const toogleForm = () => {
        setIsLoginForm(is => (!is));
        setErrors({});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        const newErrors = isLoginForm ? signInValidate.validate(data) : signUpValidate.validate(data);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const authData = {
                email: data.email,
                password: data.password
            }
            if (isLoginForm) {
                dispatch(login(authData));
            } else {
                dispatch(register(authData));
            }
        }
    }

    if (isAuth) return <Navigate to="/" replace />

    return (
        <div className={styles.page}>
            {isLoginForm
                ? <SignInForm toogleForm={toogleForm} errors={errors} isAuthInProgress={isAuthInProgress} handleSubmit={handleSubmit} />
                : <SignUpForm toogleForm={toogleForm} errors={errors} isAuthInProgress={isAuthInProgress} handleSubmit={handleSubmit} />}
        </div>
    )
}