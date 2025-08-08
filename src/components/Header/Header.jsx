import styles from "./Header.module.css"
import { ThemeContext } from "../../contexts/ThemeProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearUser, userSelector } from "../../reducers/user.slice.js";

import AuthModal from "../UserComponents/AuthModal/AuthModal";
import Image from "../Image/Image"

import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md"; 

import logoLight from "../../../src/assets/logo-blog-black.png"
import logoDark from "../../../src/assets/logo-blog-white.png"

const Header = () => {

    const {theme, switchTheme} = useContext(ThemeContext)

    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const location = useLocation();
const isUserPage = location.pathname === "/user";

    console.log("Il tuo user prima del login", user)
    
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearUser())
        if(!isUserPage){
        navigate("/")
        }
    }

    useEffect(() => {
        console.log('IL NOSTRO TEMA', theme)
    }, [theme])

    return <>
    <div className={styles.mainDiv}>
            
                <div className={styles.leftSide}>
                {user?.accessToken ? <><div className={styles.navigateToUser} onClick={()=> navigate("/user")}><Image src={user.avatar} className="header-avatar"/><p>{user.username}</p></div></> : null}
                </div>
                <img className={styles.logo}src={theme === 'dark' ? logoDark : logoLight} alt="Vite logo" onClick={()=> navigate("/")}/>
                <div className={styles.buttonsWrapper}>
                    <button className={styles.button} onClick={switchTheme}>{theme === 'dark' ? <MdLightMode color="white" size="20px"/>: <MdDarkMode size="20px"/>}</button>
                    {user.accessToken? <button className={styles.button} onClick={logout}><MdLogout color={theme === 'dark' ? "white" : "black"} size="20px"/></button> : <button className={styles.button} onClick={() => {setOpenModal(true)}}>Login</button>}
                </div>
            
        </div>
        {openModal && createPortal(
            <AuthModal 
                isOpen={openModal}
                onClose={() => {setOpenModal(false)}}
            />,
            document.body
        )}
    </>
}

export default Header