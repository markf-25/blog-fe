import styles from "../AuthModal/AuthModal.module.css";

import Input from "../../Input/Input"
import Toast from "../../Toast/Toast"

import useInput from "../../../hooks/useInput.js";
import { useState } from "react";
import {isAlphaNum, hasNoSpaces, isEmail, hasMinLength, hasMaxLength, isNotEmpty, areValuesMatching} from "../../../utils/validators.jsx"

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

  const [toastMessage, setToastMessage] = useState("");


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

        const areUsernameCharactersValid = isNotEmpty(usernameValue) && isAlphaNum(usernameValue) && hasNoSpaces(usernameValue)
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
            handleFormErrorsChange('password', 'Le password devono corrispondere');
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
            setToastMessage("Registrazione completata con successo \n Attiva l'account con il link che hai ricevuto sulla tua email")
            setIsLogin(true)
          }
      }

  return <>
      
        <div className={styles.content}>
          <h2>Registrati</h2>
          <form className={styles.form} onSubmit={sendRegistration}>
          <Input id="username" label="Username" error={registrationError.username} name="username" placeholder="Scegli uno username" onChange={handleUsernameValueChange}
                       type="text" value={usernameValue}/>
          <Input id="email" label="Email" error={registrationError.email} name="email" placeholder="Inserisci la tua email" onChange={handleEmailChange}
                       type="text" value={emailValue}/>
          <Input id="password" label="Password" name="password" placeholder="Scegli una password" onChange={handlePasswordChange}
                       type="password" value={passwordValue}/>
          <Input id="passwordConfirmed" label="Password" error={registrationError.password} name="password" placeholder="Conferma la tua password" onChange={handleConfirmPasswordChange}
                       type="password" value={confirmPasswordValue}/>  
            <button id="sendingButton" type="submit" className={styles.formButton}>
              Invia
            </button>
          </form>
        </div>
        {toastMessage && <Toast header={"Registrazione completata con successo"} message={toastMessage} onClose={() => setToastMessage("")} />}
    </>
};

export default RegistrationForm;
