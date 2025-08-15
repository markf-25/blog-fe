import styles from "../AuthModal/AuthModal.module.css"

import useInput from "../../../hooks/useInput.js";
import {useState} from "react";
import {useNavigate} from "react-router"

import Input from "../../Input/Input.jsx";
import Toast from "../../Toast/Toast"

import {hasMinLength, hasMaxLength, areValuesMatching} from "../../../utils/validators.jsx"

import { sendingANewPassword } from "../../../services/password.service.js"

const ResetPasswordForm = ({resetToken}) => {

    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");
    const {value: confirmPasswordValue, handleChange: handleConfirmPasswordChange} = useInput("");

    const [toastMessage, setToastMessage] = useState("");

    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState({
        password: '',
        confirmPassword: ""
    });

    const handleFormErrorsChange = (key, value) => {
        setFormErrors(prevState => ({...prevState, [key]: value}));
    }

    const submitPasswordChange = async (event) => {
    event.preventDefault();
    
    setFormErrors({
        password: '',
        confirmPassword: ""
        })

    const isPasswordValid = hasMinLength(passwordValue, 8) && hasMaxLength(passwordValue, 60);
    const passwordsMatch = areValuesMatching(passwordValue, confirmPasswordValue);

    if (!isPasswordValid) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri e non più di 60');
            return
        }

    if (!passwordsMatch) {
            handleFormErrorsChange('confirmPassword', 'Le password devono corrispondere');
            return
        }
    

    const payload = {
            token: resetToken,
            password: passwordValue,
        }

    const newPassword = await sendingANewPassword(payload);
        console.log(payload)
        if (newPassword) {
            setToastMessage("Password cambiata con successo")
            setTimeout(() => navigate("/"), 3000);
        }
        else {
            setToastMessage("Qualcosa è andato storto")
        }
    }

    return <>
    <div className={styles.content}>
            <h2>Scegli la nuova password</h2>
            <form className={styles.form} onSubmit={submitPasswordChange}>
                <Input id="password" label="Password" error={formErrors.password} name="password" placeholder="Inserisci la nuova password" onChange={handlePasswordChange}
                       type="password" value={passwordValue}/>
                <Input id="confirm-password" label="Conferma password" error={formErrors.confirmPassword}name="confirm-password" placeholder="Inserisci di nuovo la nuova password"
                       onChange={handleConfirmPasswordChange} type="password" value={confirmPasswordValue}/>
                <button type="submit" className="submit_button">Invia la nuova password</button>
            </form>
        </div>
        {toastMessage && <Toast header="Cambio password" message={toastMessage} onClose={() => setToastMessage("")} />}
        </>
}

export default ResetPasswordForm