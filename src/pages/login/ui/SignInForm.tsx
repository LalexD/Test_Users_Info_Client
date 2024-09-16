
import { AuthComponent } from "pages/login/ui/AuthComponent/AuthComponent";
import { IAuthFormProps } from "pages/login/ui/types";

export default function SignInForm({ isAuthInProgress, handleSubmit, toogleForm, errors }: IAuthFormProps) {
    const { Tittle, InputForm, InputList, SubmitButton, Footer: FooterText, LinkButton } = AuthComponent;

    return (
        <AuthComponent onSubmit={handleSubmit}>
            <InputList>
                <Tittle>Авторизация</Tittle>
                <InputForm name="email" label="Электронная почта" placeholder="example@mail.ru" errorMessage={errors?.email} defaultValue="eve.holt@reqres.in" />
                <InputForm name="password" label="Пароль" placeholder="******" type="password" errorMessage={errors?.password} defaultValue="cityslicka" />
            </InputList>
            <SubmitButton>Войти</SubmitButton>
            <FooterText>
                <LinkButton onClick={toogleForm}>Зарегистрироваться</LinkButton>
            </FooterText>
        </AuthComponent>
    )
}