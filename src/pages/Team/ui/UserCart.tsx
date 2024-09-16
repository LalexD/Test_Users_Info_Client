import { useAppDispatch } from 'app/store/AppStore'
import { IUser } from 'entities/user/model/types'
import { setUserForCache } from 'entities/user/model/UserSlice'
import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonLike from 'shared/ui/ButtonLike/ButtonLike'
import styles from './UserCart.module.scss'

interface IUserCartProps {
    user: IUser,
    handleLike: (e: React.MouseEvent<HTMLElement>, id: string) => void
}

const UserCart = memo<FC<IUserCartProps>>(({ user, handleLike }: IUserCartProps) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickCart = () => {
        dispatch(setUserForCache(user));
        navigate(`user/${user.id}`);
    }

    return (
        <div className={styles.cart} onClick={handleClickCart}>
            <img className={styles.avatar} src={user.avatar} alt={`Avatar ${fullName}`} height="128px" width="128px" />
            <span className={styles.name}>{fullName}</span>
            <ButtonLike isActive={user.isLike} onClick={e => handleLike(e, user.id)} className={styles.likeButton} />
        </div>
    )
})

export default UserCart

