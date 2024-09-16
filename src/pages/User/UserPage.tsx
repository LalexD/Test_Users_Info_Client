import { useAppDispatch, useAppSelector } from 'app/store/AppStore';
import { clearUser, getUserById } from 'entities/user/model/UserSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Header } from 'shared/ui/header/Header';
import { Heading } from 'shared/ui/heading/Heading';
import styles from "./UserPage.module.scss";
import PhoneIcon from "shared/assets/images/phone_icon.svg";
import EmailIcon from "shared/assets/images/email_icon.svg";

const UserPage = () => {
    const { userId } = useParams();
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userId) return
        dispatch(getUserById(userId));
        return () => {
            dispatch(clearUser());
        }
    }, [dispatch, userId])

    return (
        <>
            <Header handleBack handleLogout contentStyle={styles.headerContent}>
                <img className={styles.avatar} src={user.avatar} alt={`Avatar ${user.last_name}`} height="187px" width="187px" />
                <div className={styles.headerTittles}>
                    <Heading headingLevel="h1" className={styles['tittle-name']}>{user.first_name} {user.last_name}</Heading>
                    <Heading headingLevel="h2" className={styles['tittle-post']}>{user.post}</Heading>
                </div>
            </Header>

            <div className={styles.main}>
                <section className={styles.info}>
                    {(user.info) && (
                        <span className={styles['info-text']}>
                            {user.info}
                        </span>
                    )}

                </section>
                <section className={styles.additionalContainer}>
                    <ul className={styles.additionalInfoList}>
                        <li><a href={`tel:${user.phone}`}><img src={PhoneIcon} alt='Phone Icon' /></a>{user.phone}</li>
                        <li><a href={`mailto:${user.email}`}><img src={EmailIcon} alt='Email Icon' /></a>{user.email}</li>
                    </ul>
                </section>
            </div>
        </>
    )
}

export default UserPage