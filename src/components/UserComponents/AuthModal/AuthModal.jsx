import Modal from "../../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import ResetPasswordRequestForm from "../ResetPasswordRequestForm/ResetPasswordRequestForm"
import styles from "./AuthModal.module.css"

import {useState} from "react";

const AuthModal = ({isOpen, onClose}) => {
    
  const [isLogin, setIsLogin] = useState(true)
  const [requestNewPassword, setRequestNewPassword] = useState(false)

  const onCloseHandler = () =>{
    setIsLogin(true)
    onClose()
  }
    
    return <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Modal isOpen={isOpen} onClose={onCloseHandler}>
          {isLogin && !requestNewPassword && <>
          <LoginForm onClose={onCloseHandler} setRequestNewPassword={setRequestNewPassword}/>
          <div>
          <p>Non sei registrato?</p>
          <button  className={styles.switchButton} type="button" onClick={() => setIsLogin(false)}>Registrati!</button>
          </div>
          </>}
          {!isLogin && !requestNewPassword && <><RegistrationForm setIsLogin={setIsLogin}/>
            <div>
          <p>Hai già un account?</p>
          <button
            className={styles.switchButton}
            type="button"
            onClick={()=> setIsLogin(true)}
          >
            Loggati!
          </button>
        </div>
        </>}
        {requestNewPassword && <ResetPasswordRequestForm setIsLogin={setIsLogin} setRequestNewPassword={setRequestNewPassword} onClose={onCloseHandler}/>}

        </Modal>
      </div>
    </>
}

export default AuthModal