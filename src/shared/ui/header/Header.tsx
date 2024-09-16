import { useAppDispatch } from 'app/store/AppStore';
import clsx from 'clsx';
import { logout } from 'entities/session';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/button/Button';
import styles from './Header.module.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    handleBack?: boolean,
    handleLogout?: boolean,
    contentStyle?: string,
}

export const Header = ({ handleBack, contentStyle, children }: PropsWithChildren<HeaderProps>) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles['header-wrapper']}>
                <header className={styles.header}>
                    <Button onClick={() => navigate("/")} className={clsx(styles.button, styles['button-back'], !handleBack && styles.hidden)}>Назад</Button>
                    <div className={clsx(styles.content, contentStyle)}>
                        {children}
                    </div>
                    <Button onClick={handleLogout} className={clsx(styles.button, styles['button-logout'], !handleLogout && styles.hidden)}>Выход</Button>
                </header>
            </div>
        </div>
    )
}