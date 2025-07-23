import useInput from "../../../hooks/useInput.js";
import {useState} from "react";

import Input from "../../Input/Input.jsx";

import { isNotEmpty, isEmail } from "../../../utils/validators.jsx"

import { requestForANewPassword } from "../../../services/password.service.js"

const ResetPasswordRequestForm = ({setIsLogin, setRequestNewPassword, onClose}) => {

    const {value: emailValue, handleChange: handleEmailChange} = useInput("");


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
            alert("HA FUNZIONATO! Presto ci sarà un magnifico toast")
            onClose()

        }
        else {
            alert("operazione fallita")
        }
    }

    return <>
    <div /* className={styles.content} */>
            <h2>Scegli la nuova password</h2>
            <form /* className={styles.form} */ onSubmit={requestPassword}>
                <Input id="email" label="email" error={formErrors.email} name="email" placeholder="Inserisci la tua email" onChange={handleEmailChange} value={emailValue}/>
                <button type="submit" className="submit_button">Richiedi la nuova password</button>
                <button type="button" className="button" onClick={()=> {setIsLogin(true), setRequestNewPassword(false)}}>Torna al login</button>
            </form>
        </div>
        </>
}

export default ResetPasswordRequestForm