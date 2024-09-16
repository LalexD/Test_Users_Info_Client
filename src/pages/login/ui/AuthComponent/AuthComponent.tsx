import { FormHTMLAttributes, PropsWithChildren } from "react";
import { Button, ButtonProps } from "shared/ui/button/Button";
import { Heading } from "shared/ui/heading/Heading";
import { Input, InputProps } from "shared/ui/input/Input";
import styles from './AuthComponent.module.scss';

function AuthComponent({ children, ...props }: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
    return (
        <form className={styles.form} {...props}>
            {children}
        </form>
    );
}

module AuthComponent {
    export const Tittle = ({ children }: PropsWithChildren<{}>) => {
        return <Heading headingLevel="h2" >{children}</Heading>;
    };

    export const InputForm = ({ ...props }: InputProps) => {
        return <Input {...props} />;
    };

    export const InputList = ({ children }: PropsWithChildren) => {
        return <div className={styles["input-list"]}>{children}</div>;
    };

    export const SubmitButton = ({ children }: ButtonProps) => {
        return <Button type="submit" className={styles.button}>{children}</Button>;
    };

    export const Footer = ({ children }: PropsWithChildren<{}>) => {
        return <div className={styles['footer']}>{children}</div>;
    };

    export const LinkButton = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
        return <Button className={styles['link-button']} {...props}>{children}</Button>;
    };
}

export { AuthComponent };