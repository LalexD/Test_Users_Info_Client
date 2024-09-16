import { ButtonHTMLAttributes, memo, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'transparent' | 'link';
    icon?: {
        src: string;
        position: 'left' | 'right';
        width?: string;
        height?: string;
    }
    isProgress?: boolean;
}

export const Button = memo<PropsWithChildren<ButtonProps>>(({
    type = 'button',
    variant: buttonColor = 'primary',
    isProgress = false,
    icon,
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[buttonColor],
                className
            )}
            type={type}
            {...props}>
            {(icon?.position === 'left') && <img src={icon.src} alt='button icon' width={icon.width} height={icon.height} />}
            {children}
            {(icon?.position === 'right') && <img src={icon.src} alt='button icon' width={icon.width} height={icon.height} />}
        </button>
    )
});

