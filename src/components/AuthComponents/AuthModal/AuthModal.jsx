import Modal from "../../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import styles from "./AuthModal.module.css"

const AuthModal = ({isOpen, onClose, isLogin, setIsLogin}) => {
    return <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Modal isOpen={isOpen} onClose={onClose}>
          {isLogin ? (
            <LoginForm onClose={onClose} setIsLogin={setIsLogin} />) 
            : 
            (<RegistrationForm onClose={onClose} setIsLogin={setIsLogin} />)}
        </Modal>
      </div>
    </>
}

export default AuthModal