import React, {FC, useState} from "react";
// @ts-ignore
import style from "./Paginator.module.css"
import {onPageChanged} from "../../store/userPageReducer";
import {useDispatch} from "react-redux";

interface PaginatorProps {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    portionSize: number,
}

const Paginator: FC<PaginatorProps> = ({
                                           totalItemsCount, pageSize,
                                           currentPage, portionSize = 10
                                       }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionsCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1); // локальный стэйт для хранения номера порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    const dispatch = useDispatch();
    const pageChange = (page: number) => {
        dispatch(onPageChanged(page));
    }

    return (
        <div className={style.pagination}>
            {(portionNumber > 1) && <button className={style.button} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                .map(p => {
                        //return <span className={(currentPage === p && style.selectedPage),pageNumber }
                        return <span className={currentPage === p
                            ? style.selectedPage
                            : style.pageNumber}
                                     key={p}
                                     onClick={() => {
                                         pageChange(p)
                                     }}>{p}</span>
                    }
                )}
            {(portionsCount > portionNumber) && <button className={style.button} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
            <b> всего самураев: {totalItemsCount}</b>
        </div>
    )
}
export default Paginator