import Header from '../Header/Header';

import { Outlet } from "react-router";

import { useTheme } from '@mui/material/styles';

import styles from "./MainLayout.module.css"


function MainLayout() {

    const theme = useTheme();
    
    return (
        <div style={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
