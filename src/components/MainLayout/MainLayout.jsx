import Header from '../Header/Header';

import { Outlet } from "react-router";


function MainLayout() {
    
    return(
        <div>
        <Header />
        <Outlet />
        </div>
    )
}

export default MainLayout