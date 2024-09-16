import { useAppDispatch, useAppSelector } from "app/store/AppStore";
import { getTeamUsers, toogleLikeUser } from "entities/team/model/TeamSlice";
import UserCart from "pages/Team/ui/UserCart";
import { useCallback, useEffect, useState } from "react";
import { Button } from "shared/ui/button/Button";
import { Header } from "shared/ui/header/Header"
import { Heading } from "shared/ui/heading/Heading"
import styles from "./TeamPage.module.scss";
import RowDownIcon from "shared/assets/images/row_down_icon.svg";

const NUM_USER_PER_PAGE = 8;

export const TeamPage = () => {
    const { users, loading, isMore, } = useAppSelector(state => state.team);
    const [numUser, setNumUser] = useState(NUM_USER_PER_PAGE);
    const [firstRender, setFirstRender] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTeamUsers(numUser));
        setFirstRender(false);
    }, [dispatch, numUser])

    const handleMoreUser = () => {
        if (isMore) {
            setNumUser((num) => num + NUM_USER_PER_PAGE)
        }
    }

    const handleToogleLikeByIdUser = useCallback((event: React.MouseEvent<HTMLElement>, id: string): void => {
        event.stopPropagation();
        dispatch(toogleLikeUser(id));
    }, [dispatch]);

    return (
        <>
            <Header handleLogout contentStyle={styles["header-content"]}>
                <Heading headingLevel="h1" className={styles['tittle-h1']}>Наша команда</Heading>
                <Heading headingLevel="h2" className={styles['tittle-h2']}>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </Heading>
            </Header>
            <div className={styles.main}>
                <div className={styles['users-list']}>
                    {!firstRender && users &&
                        users.map((user, index) =>
                            (index < numUser)
                                ? <UserCart key={user.id} user={user} handleLike={handleToogleLikeByIdUser} />
                                : ''
                        )}
                </div>
                <div className={styles['button-more-block']}>
                    {loading && (<div className="spinner"></div>)}
                    {!loading && isMore && <Button onClick={handleMoreUser} variant='transparent' icon={{ src: RowDownIcon, position: "right", width: "18px", height: "18px" }}>Показать еще</Button>}
                </div>
            </div>
        </>
    )
}
