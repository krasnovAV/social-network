import React from 'react';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
// @ts-ignore
import style from "./App.module.css"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Users} from "./components/Users/Users";
import Profile from './components/Profile/Profile';

// const идет после импорта
// lazy и Suspense используются для "ленивой загрузки" при загрузке приложения в браузер
//const Profile = React.lazy(() => import('./components/Profile/Profile'));
//const Users = React.lazy(() => import('./components/Users/Users'));

// стояла последняя версия react-router-dom на 24,02,22 маршрутизация не работала.
// пришлось понизить версию "react-router-dom": "^5.2.0" "@types/react-router-dom": "^5.1.7" заработало
const App: React.FC = () => {
    const authorizedId = 21754;


    return (
        <BrowserRouter>
            <div>
                <Header/>
                <div className={style.wrapper}>
                    <div>
                        <Navbar/>
                    </div>
                    <div className={style.contentWrapper}>
                            {/*в :userId? ? означает необязательный параметр*/}
                            <Route path={'/profile/:Id?'}><Profile authorizedId={authorizedId}/></Route>
                            <Route path={'/users'}><Users/></Route>


                            <Route path={'/messages'}>Messages</Route>

                            <Route path={'/news'}> News</Route>
                            <Route path={'/login'}> Login</Route>
                            <Route path={'/friends'}> Friends</Route>
                    </div>
                </div>
            </div>
        </BrowserRouter>

    );
}


export default App;