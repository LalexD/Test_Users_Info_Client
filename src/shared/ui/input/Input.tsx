import clsx from "clsx";
import { InputHTMLAttributes, memo, PropsWithChildren } from "react";
import styles from "./input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    errorMessage?: string;
    label?: string;
}

export const Input = memo<PropsWithChildren<InputProps>>(({ name, label, errorMessage, ...props }) => {
    return (
        <div className={clsx(styles["input-container"], errorMessage && styles.error)}>
            <label className={clsx(styles.label)} htmlFor={name}>{label}</label>
            <input className={clsx(styles.input)} id={name} name={name} {...props} />
            <span className={styles['error-message']}>{errorMessage}</span>
        </div>
    )
});