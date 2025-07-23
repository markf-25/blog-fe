import styles from "../AuthModal/AuthModal.module.css";
import useInput from "../../../hooks/useInput.js";
import {useState} from "react";
import {useDispatch} from "react-redux";

import Input from "../../Input/Input.jsx";

import {login} from "../../../services/login.service.js"

import {setUser} from "../../../reducers/user.slice.js";

import {isEmail} from "../../../utils/validators.jsx"


const LoginForm = ({onClose, setRequestNewPassword}) => {

    const {value: emailValue, handleChange: handleEmailChange} = useInput("");
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");

    const dispatch = useDispatch()

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleFormErrorsChange = (key, value) => {
        setFormErrors(prevState => ({...prevState, [key]: value}));
    }

    const submitForm = async (event) => {
    event.preventDefault();
    
    setFormErrors({
            email: '',
            password: '',
        })

    if(!isEmail(emailValue)) {
        handleFormErrorsChange({email: "L'email non è valida"})
    }

    const payload = {
            email: emailValue,
            password: passwordValue,
        }

    const user = await login(payload);
        if (user) {
            dispatch(setUser(user));
            console.log("Il tuo user dopo il login", user)
            onClose()
        }
        else {
            console.error("Login fallito")
        }
    }

    return <>
    <div className={styles.content}>
            <h2>Login</h2>
            <form className={styles.form} onSubmit={submitForm}>
                <Input id="email" label="Email" error={formErrors.email} name="email" placeholder="Inserisci un'e-mail" onChange={handleEmailChange}
                       type="text" value={emailValue}/>
                <Input id="password" label="Password" error={formErrors.password} name="password" placeholder="Inserisci la tua password"
                       onChange={handlePasswordChange} type="password" value={passwordValue}/>
                <button type="submit" className="submit_button">Accedi</button>
            </form>
            <button type="button" className="button" onClick={()=> setRequestNewPassword(true)}>Password dimenticata?</button>
        </div>
        </>
}

export default LoginForm