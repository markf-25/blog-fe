import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom";
import {createPortal} from "react-dom";
import {useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {clearUser, userSelector} from "../../reducers/user.slice.js";

import AuthModal from "../UserComponents/AuthModal/AuthModal";
import Image from "../Image/Image"

const theme = "dark"

const Header = () => {

    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    console.log("Il tuo user prima del login", user)
    
    const [openModal, setOpenModal] = useState(false);


    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearUser())
        setOpenModal(false)
    }

    return <>
    <div className={styles.mainDiv}>
            
                <div className={styles.leftSide}>
                <img className={styles.logo}src="/vite.svg" alt="Vite logo" onClick={()=> navigate("/")}/>
                {user?.accessToken ? <><Image src={user.avatar} className="header-avatar"/><p>{user.username}</p></> : null}
                </div>
                <div className={styles.buttonsWrapper}>
                    <button className={styles.button} onClick={()=>{}}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
                    {user.accessToken? <button className={styles.button} onClick={logout}>Esci</button> : <button className={styles.button} onClick={() => {setOpenModal(true)}}>Login</button>}
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