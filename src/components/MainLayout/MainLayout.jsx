import Header from '../Header/Header';

import { Outlet } from "react-router";


function MainLayout() {

/*     const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}; */
    
    return(
        <div>
        <Header />
        <Outlet />
        </div>
    )
}

export default MainLayout