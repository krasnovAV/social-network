import {FC, useEffect} from "react";
import {userTypedSelector} from "../../hooks/useTypedSelector";
import {getUsers} from "../../store/userPageReducer";
import {UserItem} from "./UserItem";
import {useDispatch} from "react-redux";
import Paginator from "../Common/Paginator";


export const Users: FC = () => {
    const {
        users,
        error,
        totalCount,
        isFetching,
        pageSize,
        pageNumber,
        followingInProgress
    } = userTypedSelector(state => state.usersPage)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(pageNumber, pageSize))
    }, [pageNumber])

    // if (isFetching) {
    //     return <h1>Loading...</h1>
    // }

    return (
        <div>
            <div>
                <Paginator totalItemsCount={totalCount} pageSize={pageSize}
                           currentPage={pageNumber} portionSize={pageSize}/>
            </div>
            <div>
                {users.map(user => <UserItem key={user.id} user={user} followingInProgress={followingInProgress}/>)}
            </div>
        </div>


    )
}