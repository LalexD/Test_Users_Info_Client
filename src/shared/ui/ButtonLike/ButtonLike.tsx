import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './ButtonLike.module.scss';

interface IButtonLikeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean,
}

const ButtonLike = ({ onClick, isActive, className }: PropsWithChildren<IButtonLikeProps>) => {
    return (
        <button onClick={onClick} className={clsx(styles.likeButton, isActive && styles.isActive, className && className)}>
            <svg width="16" height="16" viewBox="0 0 16 16" className={styles.icon} xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" stroke="var(--color-stroke)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </button>
    )
}

export default ButtonLike