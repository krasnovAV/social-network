import React, {FC} from "react";
import {IUser} from "../../types/usersTypes";

// @ts-ignore
import style from "./UsersStyle.module.css"
// @ts-ignore
import userDefaultAvatar from "./../../images/avatar.png"
import {follow, unfollow} from "../../store/userPageReducer";
import {useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";

interface UserItemProps {
    user: IUser,
    followingInProgress: number[]
}

export const UserItem: FC<UserItemProps> = ({user, followingInProgress}) => {
    // todo педелать в useEffect?
    const dispatch = useDispatch();
    const Follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const Unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className={style.wrapper}>
            <div>
                <NavLink to={"profile/" + user.id}>
                    <img className={style.avatar} src={user.photos.small || userDefaultAvatar} alt="avatar"/>
                </NavLink>

            </div>
            <div className={style.info}>
                <div className={style.item}>userId: {user.id}</div>
                <div className={style.item}>userName: {user.name}</div>
                <div className={style.item}>status: {user.status}</div>
                <div className={style.item}>
                    {user.followed ?
                        <button disabled={followingInProgress.includes(user.id)}
                                onClick={() => {
                                    Unfollow(user.id)
                                }}>delete from friend</button>
                        : <button disabled={followingInProgress.includes(user.id)}
                                  onClick={() => {
                                      Follow(user.id)
                                  }}>add to friend</button>
                    }
                </div>
            </div>
        </div>
    )
}