import styles from "./RegistrationForm.module.css";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegistrationForm = () => {
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
    navigate("/");
  }

  return <>
      <div className={styles.content}>
        <div className={styles.content}>
          <form className={styles.registrationForm} onSubmit={sendRegistration}>
            <h2>registration form bellissimo</h2>
            <p>Registrati!</p>
            {/* <label htmlFor="username">Username</label> 
                <input type="text" id="username" placeholder="Username" value={registrationData.username} onChange={handleChange}></input> */}
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              placeholder="Inserisci un'e-mail"
              value={emailValue}
              onChange={handleEmailChange}>
            </input>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="la tua password"
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
            onClick={() => navigate("/")}
          >
            Loggati!
          </button>
        </div>
      </div>
    </>
};

export default RegistrationForm;
