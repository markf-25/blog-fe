import useInput from "../../../hooks/useInput.js";
import {useState} from "react";

import Input from "../../Input/Input.jsx";
import Toast from "../../Toast/Toast"

import { isNotEmpty, isEmail } from "../../../utils/validators.jsx"

import { requestForANewPassword } from "../../../services/password.service.js"

import styles from "../../Modal/Modal.module.css"

const ResetPasswordRequestForm = ({setIsLogin, setRequestNewPassword, onClose}) => {

    const {value: emailValue, handleChange: handleEmailChange} = useInput("");

    const [toastMessage, setToastMessage] = useState("");


    const [formErrors, setFormErrors] = useState({
        email: '',
    });

    const requestPassword = async (event) => {
    event.preventDefault();
    
    setFormErrors({
        email: ''
        })
    
    const isEmailValid = isNotEmpty(emailValue) && isEmail(emailValue);

    if(!isEmailValid) {
          setFormErrors('email', "L'email deve avere un formato valido");
          return
        }        

    const payload = {
            email: emailValue
        }

    const resetRequest = await requestForANewPassword(payload);
        console.log(payload)
        if (resetRequest) {
            setToastMessage("Clicca sul link che hai ricevuto via mail per scegliere una nuova password")
            setTimeout(() => onClose(), 5000);

        }
        else {
            setToastMessage("Qualcosa è andato storto. Riprova")
        }
    }

    return <>
    <div className={styles.content}>
            <h2 className={styles.header}>Password dimenticata?</h2>
            <form className={styles.children} onSubmit={requestPassword}>
                <Input id="email" error={formErrors.email} name="email" placeholder="Inserisci la tua email" onChange={handleEmailChange} value={emailValue}/>
                <button type="submit" className="submit_button">Richiedi la nuova password</button>
                <button type="button" className="button" onClick={()=> {setIsLogin(true), setRequestNewPassword(false)}}>Torna al login</button>
            </form>
        </div>
        {toastMessage && <Toast header="Cambio password" message={toastMessage} onClose={() => setToastMessage("")} />}
        </>
}

export default ResetPasswordRequestForm