import styles from "./LoginForm.module.css";
import useInput from "../../hooks/useInput.js";
import {useNavigate} from "react-router-dom";
import Input from "../Input/Input";

import Logo from "../../assets/react.svg"


const LoginForm = () => {

    const {value: emailValue, handleChange: handleEmailChange} = useInput("");
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");

    const navigate = useNavigate();

    const submitForm = (event) => {
    event.preventDefault();
    console.log("SUBMIT", emailValue, passwordValue)
    navigate("/counter")
    }

    return <div className={styles.content}>
            <img src={Logo} className="logo" alt="logo"/>
            <h2>Accedi</h2>
            <form className={styles.emailForm} onSubmit={submitForm}>
                <Input id="email" label="Email" /* error={formErrors.email} */ name="email" onChange={handleEmailChange}
                       type="text" value={emailValue}/>
                <Input id="password" label="Password" /* error={formErrors.password} */ name="password"
                       onChange={handlePasswordChange} type="password" value={passwordValue}/>
                <button type="submit" className="submit_button">Accedi</button>
            </form>
            <div className={styles.switch}>
          <p>Non sei registrato?</p>
          
          <button className="switch-button" type="button" onClick={() => navigate("/registration")}>Registrati!</button>
          
          </div>
        </div>
}

export default LoginForm