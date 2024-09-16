import { ValidateFormHelper } from "shared/lib/ValidateFormHelper";


export const signUpValidate = new ValidateFormHelper([
    {
        dataName: "name",
        message: "Минимальная длина 3 символа",
        rules: { min: 3, isRequired: true }
    }, {
        dataName: "email",
        message: "Не соответсвует формату электронной почты",
        rules: { email: true }
    }, {
        dataName: "password",
        message: "Минимальная длина 6 символов",
        rules: { min: 6 }
    }, {
        dataName: "confirmPassword",
        message: "Не совпадение пароля",
        rules: { isConfirm: "password", isRequired: true }
    }]);
