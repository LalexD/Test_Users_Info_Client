import { IAuthFormProps } from "pages/login/ui/types";
import { AuthComponent } from "pages/login/ui/AuthComponent/AuthComponent";

export default function SignUpForm({ isAuthInProgress, handleSubmit, toogleForm, errors }: IAuthFormProps) {
    const { Tittle, InputForm, InputList, SubmitButton, Footer: FooterText, LinkButton } = AuthComponent;

    return (
        <AuthComponent onSubmit={handleSubmit}>
            <InputList>
                <Tittle>Регистрация</Tittle>
                <InputForm name="name" label="Имя" placeholder="Артур" errorMessage={errors?.name} />
                <InputForm name="email" label="Электронная почта" placeholder="example@mail.ru" errorMessage={errors?.email} defaultValue="eve.holt@reqres.in" />
                <InputForm name="password" label="Пароль" placeholder="******" type="password" errorMessage={errors?.password} defaultValue="pistol" />
                <InputForm name="confirmPassword" label="Подтвердите пароль" placeholder="******" type="password" errorMessage={errors?.confirmPassword} defaultValue="pistol" />
            </InputList>
            <SubmitButton>Зарегистрироваться</SubmitButton>
            <FooterText>
                <LinkButton onClick={toogleForm}>Войти</LinkButton>
            </FooterText>
        </AuthComponent>
    )
}