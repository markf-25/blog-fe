import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom";
import {createPortal} from "react-dom";
import {useState} from "react";

import AuthModal from "../AuthComponents/AuthModal/AuthModal";

const user = false;
const theme = "dark"

const Header = () => {
    
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true)


    const navigate = useNavigate();

    return <>
    <div className={styles.mainDiv}>
            
                <div className={styles.leftSide}>
                <img className={styles.logo}src="/vite.svg" alt="Vite logo" onClick={() => navigate("/")}/>
                {/* {user?.displayName ? <p>{user.displayName.toUpperCase()}</p> : <p>Non sei loggato</p>} */}
                </div>
                <div className={styles.buttonsWrapper}>
                    <button onClick={()=>{}}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
                    {user? <button onClick={()=>{}}>Esci</button> : <button onClick={() => {setOpenModal(!openModal)}}>Login</button>}
                </div>
            
        </div>
        {openModal && createPortal(
            <AuthModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
            />,
            document.body
        )}
    </>
}

export default Header