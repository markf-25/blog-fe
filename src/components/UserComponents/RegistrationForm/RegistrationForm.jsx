import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

import useInput from "../../../hooks/useInput.js";
import { isAlphaNum, hasNoSpaces, isEmail, hasMinLength, hasMaxLength, isNotEmpty, areValuesMatching } from "../../../utils/validators.jsx";
import { signUp, usernameAvailable } from "../../../services/registration.service.js";

import Toast from "../../Toast/Toast";

const RegistrationForm = ({ setIsLogin }) => {
  const { value: usernameValue, handleChange: handleUsernameValueChange } = useInput("");
  const { value: emailValue, handleChange: handleEmailChange } = useInput("");
  const { value: passwordValue, handleChange: handlePasswordChange } = useInput("");
  const { value: confirmPasswordValue, handleChange: handleConfirmPasswordChange } = useInput("");

  const [registrationError, setRegistrationError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleFormErrorsChange = (key, value) => {
    setRegistrationError((prevState) => ({ ...prevState, [key]: value }));
  };

  const sendRegistration = async (event) => {
    event.preventDefault();

    setRegistrationError({ username: "", email: "", password: "", confirmPassword: "" });

    const areUsernameCharactersValid = isNotEmpty(usernameValue) && isAlphaNum(usernameValue) && hasNoSpaces(usernameValue);
    const isUsernameLengthValid = hasMinLength(usernameValue, 3) && hasMaxLength(usernameValue, 30);

    const isEmailValid = isNotEmpty(emailValue) && isEmail(emailValue);
    const isPasswordValid = hasMinLength(passwordValue, 8) && hasMaxLength(passwordValue, 60);
    const passwordsMatch = areValuesMatching(passwordValue, confirmPasswordValue);

    if (!areUsernameCharactersValid || !isUsernameLengthValid) {
      handleFormErrorsChange("username", "Inserisci uno username fra i 3 e i 30 caratteri alfanumerici, senza spazi");
    }

    if (!isEmailValid) {
      handleFormErrorsChange("email", "L'email deve avere un formato valido");
    }

    if (!isPasswordValid) {
      handleFormErrorsChange("password", "La password deve contenere almeno 8 caratteri");
    }

    if (!passwordsMatch) {
      handleFormErrorsChange("confirmPassword", "Le password devono corrispondere");
    }

    if (!areUsernameCharactersValid || !isUsernameLengthValid || !isEmailValid || !isPasswordValid || !passwordsMatch) {
      return;
    }

    const usernameChosen = await usernameAvailable(usernameValue);
    if (!usernameChosen.available) {
      handleFormErrorsChange("username", "Username non disponibile");
      return;
    }

    const payload = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    const res = await signUp(payload);
    if (res) {
      setToastMessage("Registrazione completata con successo. Attiva l'account con il link ricevuto via email");
      setIsLogin(true);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={sendRegistration} noValidate sx={{ mt: 1 }}>
        <Typography variant="h5" mb={2}>
          Registrati
        </Typography>

        <TextField
          fullWidth
          id="username"
          label="Username"
          margin="normal"
          type="text"
          value={usernameValue}
          onChange={handleUsernameValueChange}
          error={Boolean(registrationError.username)}
          helperText={registrationError.username}
        />

        <TextField
          fullWidth
          id="email"
          label="Email"
          margin="normal"
          type="email"
          value={emailValue}
          onChange={handleEmailChange}
          error={Boolean(registrationError.email)}
          helperText={registrationError.email}
        />

        <TextField
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          error={Boolean(registrationError.password)}
          helperText={registrationError.password}
        />

        <TextField
          fullWidth
          id="confirmPassword"
          label="Conferma Password"
          margin="normal"
          type="password"
          value={confirmPasswordValue}
          onChange={handleConfirmPasswordChange}
          error={Boolean(registrationError.confirmPassword)}
          helperText={registrationError.confirmPassword}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Invia
        </Button>
      </Box>

      {toastMessage && (
        <Toast header="Registrazione completata con successo" message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </>
  );
};

export default RegistrationForm;
