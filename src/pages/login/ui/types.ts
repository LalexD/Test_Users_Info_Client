import { TValidateFormError } from "shared/lib/ValidateFormHelper";

export interface IAuthFormProps {
    toogleForm: () => void,
    errors: TValidateFormError,
    isAuthInProgress: boolean,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}