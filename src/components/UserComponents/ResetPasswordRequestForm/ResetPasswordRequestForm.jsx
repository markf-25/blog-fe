import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

import useInput from "../../../hooks/useInput.js";
import Toast from "../../Toast/Toast";

import { isNotEmpty, isEmail } from "../../../utils/validators.jsx";
import { requestForANewPassword } from "../../../services/password.service.js";

const ResetPasswordRequestForm = ({ setIsLogin, setRequestNewPassword, onClose }) => {
  const { value: emailValue, handleChange: handleEmailChange } = useInput("");

  const [toastMessage, setToastMessage] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "" });

  const requestPassword = async (event) => {
    event.preventDefault();

    setFormErrors({ email: "" });

    const isEmailValid = isNotEmpty(emailValue) && isEmail(emailValue);

    if (!isEmailValid) {
      setFormErrors({ email: "L'email deve avere un formato valido" });
      return;
    }

    const payload = { email: emailValue };

    const resetRequest = await requestForANewPassword(payload);
    console.log(payload);

    if (resetRequest) {
      setToastMessage("Clicca sul link che hai ricevuto via mail per scegliere una nuova password");
      setTimeout(() => onClose(), 5000);
    } else {
      setToastMessage("Qualcosa è andato storto. Riprova");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={requestPassword} noValidate sx={{ mt: 1 }}>
        <Typography variant="h5" mb={2}>
          Password dimenticata?
        </Typography>

        <TextField
          fullWidth
          id="email"
          label="Email"
          margin="normal"
          type="email"
          value={emailValue}
          onChange={handleEmailChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 1 }}>
          Richiedi la nuova password
        </Button>

        <Button
          type="button"
          variant="text"
          fullWidth
          onClick={() => {
            setIsLogin(true);
            setRequestNewPassword(false);
          }}
        >
          Torna al login
        </Button>
      </Box>

      {toastMessage && <Toast header="Cambio password" message={toastMessage} onClose={() => setToastMessage("")} />}
    </>
  );
};

export default ResetPasswordRequestForm;
