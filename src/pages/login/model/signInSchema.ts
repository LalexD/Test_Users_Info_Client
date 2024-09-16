import { ValidateFormHelper } from "shared/lib/ValidateFormHelper";


export const signInValidate = new ValidateFormHelper([
    {
        dataName: "email",
        message: "Не соответсвует формату электронной почты",
        rules: { email: true }
    },
    {
        dataName: "email",
        message: "Поле не может быть пустым",
        rules: { isRequired: true }
    }, {
        dataName: "password",
        message: "Поле не может быть пустым",
        rules: { isRequired: true }
    },]);
