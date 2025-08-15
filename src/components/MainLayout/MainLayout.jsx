import Header from '../Header/Header';

import { Outlet } from "react-router";

import styles from "./MainLayout.module.css"


function MainLayout() {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.mainLayoutContent}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
