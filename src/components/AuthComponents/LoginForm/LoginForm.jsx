import styles from "../AuthModal/AuthModal.module.css";
import useInput from "../../../hooks/useInput.js";

import Input from "../../Input/Input.jsx";


const LoginForm = ({onClose, setIsLogin, header}) => {

    const {value: emailValue, handleChange: handleEmailChange} = useInput("");
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");


    const submitForm = (event) => {
    event.preventDefault();
    console.log("SUBMIT", emailValue, passwordValue)
    onClose()
    }

    return <>
    <div className={styles.content}>
            <h2>{header}</h2>
            <form className={styles.form} onSubmit={submitForm}>
                <Input id="email" label="Email" /* error={formErrors.email} */ name="email" placeholder="Inserisci un'e-mail" onChange={handleEmailChange}
                       type="text" value={emailValue}/>
                <Input id="password" label="Password" /* error={formErrors.password} */ name="password" placeholder="Inserisci la tua password"
                       onChange={handlePasswordChange} type="password" value={passwordValue}/>
                <button type="submit" className="submit_button">Accedi</button>
            </form>
            <div className={styles.switch}>
          <p>Non sei registrato?</p>
          
          <button className="switch-button" type="button" onClick={() => setIsLogin(false)}>Registrati!</button>
          
          </div>
        </div>
        </>
}

export default LoginForm