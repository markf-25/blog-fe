import styles from "../AuthModal/AuthModal.module.css";
import useInput from "../../../hooks/useInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegistrationForm = ({onClose, setIsLogin, header}) => {
  const navigate = useNavigate();

  const { value: emailValue, handleChange: handleEmailChange } = useInput("");
  const { value: passwordValue, handleChange: handlePasswordChange } =
    useInput("");
  const {
    value: confirmPasswordValue,
    handleChange: handleConfirmPasswordChange,
  } = useInput("");

  const [registrationData, setRegistrationData] = useState({
    /* username: "", */
    email: "",
    password: "",
    passwordConfirmed: "",
    confirm: "",
  });

  const [registrationError, setRegistrationError] = useState({
    /* username: "", */
    email: "",
    password: "",
  });

  /* setRegistrationData((prevState) => (
            {...prevState, [id]: value}
        )); */

  function sendRegistration(event) {
    event.preventDefault();
    console.log(
      "TI SEI REGISTRATO",
      emailValue,
      passwordValue,
      confirmPasswordValue
    );
    setIsLogin(true)
  }

  return <>
      
        <div className={styles.content}>
          <h2>{header}</h2>
          <form className={styles.form} onSubmit={sendRegistration}>
           {/* <label htmlFor="username">Username</label> 
                <input type="text" id="username" placeholder="Username" value={registrationData.username} onChange={handleChange}></input> */}
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
            {/* {registrationError.username?.length > 0 && <p>{registrationError.username}</p>} */}
            {registrationError.email?.length > 0 && (
              <p>{registrationError.email}</p>
            )}
            {registrationError.password?.length > 0 && (
              <p>{registrationError.password}</p>
            )}
            {registrationData.confirm?.length > 0 && (
              <p>{registrationData.confirm}</p>
            )}
          </div>
        </div>
        <div className={styles.switch}>
          <p>Hai già un account?</p>
          <button
            className="switch-button"
            type="button"
            onClick={()=>setIsLogin(true)}
          >
            Loggati!
          </button>
        </div>
    </>
};

export default RegistrationForm;
