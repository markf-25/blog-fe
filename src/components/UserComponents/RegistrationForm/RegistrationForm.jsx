import styles from "../AuthModal/AuthModal.module.css";
import useInput from "../../../hooks/useInput.js";
import { useState } from "react";
import {isAlphaNum, isEmail, hasMinLength, hasMaxLength, isNotEmpty, areValuesMatching} from "../../../utils/validators.jsx"

import { signUp, usernameAvailable } from "../../../services/registration.service.js"


const RegistrationForm = ({setIsLogin}) => {

  const { value: usernameValue, handleChange: handleUsernameValueChange } = useInput("");
  const { value: emailValue, handleChange: handleEmailChange } = useInput("");
  const { value: passwordValue, handleChange: handlePasswordChange } = useInput("");
  
  const {
    value: confirmPasswordValue,
    handleChange: handleConfirmPasswordChange,
  } = useInput("");

  const [registrationError, setRegistrationError] = useState({
        username: "",
        email: '',
        password: '',
        confirmPassword: '',
  });

    const handleFormErrorsChange = (key, value) => {
        setRegistrationError(prevState => ({...prevState, [key]: value}));
    }

    const sendRegistration = async (event) => {
        event.preventDefault();
        setRegistrationError({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        })

        const areUsernameCharactersValid = isNotEmpty(usernameValue) && isAlphaNum(usernameValue)
        const isUsernameLengthValid = hasMinLength(usernameValue, 3) && hasMaxLength(usernameValue, 30);
        const isEmailValid = isNotEmpty(emailValue) && isEmail(emailValue);
        const isPasswordValid = hasMinLength(passwordValue, 8) && hasMaxLength(passwordValue, 60);
        const passwordsMatch = areValuesMatching(passwordValue, confirmPasswordValue);
      
        if(!areUsernameCharactersValid || !isUsernameLengthValid){
        handleFormErrorsChange('username', 'Inserisci uno username fra i 3 e i 30 caratteri alfanumerici, senza spazi');
        }
        
        if(!isEmailValid) {
          handleFormErrorsChange('email', "L'email deve avere un formato valido");
        }        
        
        if (!isPasswordValid) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri');
        }

        if (!passwordsMatch) {
            handleFormErrorsChange('confirmPassword', 'Le password devono corrispondere');
        }

        if (!areUsernameCharactersValid || !isUsernameLengthValid || !isEmailValid || !isPasswordValid || !passwordsMatch) {
            return
        }

        const usernameChosen = await usernameAvailable(usernameValue)

          if(!usernameChosen.available) {
            handleFormErrorsChange('username', 'Username non disponibile');
            return
          }

        const payload = {
            username: usernameValue,
            email: emailValue,
            password: passwordValue,
        }

      const res = await signUp(payload);
          if(res) {
            setIsLogin(true)
          }
      }

  return <>
      
        <div className={styles.content}>
          <h2>Registrati</h2>
          <form className={styles.form} onSubmit={sendRegistration}>
          <label htmlFor="username">Username</label> 
                <input type="text" id="username" placeholder="Username" value={usernameValue} onChange={handleUsernameValueChange}></input>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Inserisci un'e-mail"
              value={emailValue}
              onChange={handleEmailChange}>
            </input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Inserisci la tua password"
              value={passwordValue}
              onChange={handlePasswordChange}>
            </input>
            <input
              type="password"
              id="passwordConfirmed"
              placeholder="conferma la tua password"
              value={confirmPasswordValue}
              onChange={handleConfirmPasswordChange}>
            </input>
            <button id="sendingButton" type="submit">
              Invia
            </button>
          </form>

          <div className={styles.error}>
            {registrationError?.username && <p>{registrationError.username}</p>}
            {registrationError?.email && <p>{registrationError.email}</p>}
            {registrationError?.password && <p>{registrationError.password}</p>}
            {registrationError?.confirmPassword && <p>{registrationError.confirmPassword}</p>}
          </div>
        </div>
    </>
};

export default RegistrationForm;
