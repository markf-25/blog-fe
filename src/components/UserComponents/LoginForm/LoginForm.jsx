import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box, Typography } from "@mui/material";

import useInput from "../../../hooks/useInput.js";
import { login } from "../../../services/login.service.js";
import { setUser } from "../../../reducers/user.slice.js";
import { isEmail } from "../../../utils/validators.jsx";

const LoginForm = ({ onClose, setRequestNewPassword }) => {
  const { value: emailValue, handleChange: handleEmailChange } = useInput("");
  const { value: passwordValue, handleChange: handlePasswordChange } = useInput("");

  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleFormErrorsChange = (key, value) => {
    setFormErrors((prevState) => ({ ...prevState, [key]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    setFormErrors({ email: "", password: "" });

    if (!isEmail(emailValue)) {
      handleFormErrorsChange("email", "L'email non è valida");
      return;
    }

    if (!passwordValue) {
      handleFormErrorsChange("password", "La password è richiesta");
      return;
    }

    const payload = {
      email: emailValue,
      password: passwordValue,
    };

    const user = await login(payload);
    if (user) {
      dispatch(setUser(user));
      console.log("Il tuo user dopo il login", user);
      onClose();
    } else {
      console.error("Login fallito");
      // Puoi aggiungere un messaggio di errore globale se vuoi
    }
  };

  return (
    <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" mb={2}>
        Login
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

      <TextField
        fullWidth
        id="password"
        label="Password"
        margin="normal"
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
        error={Boolean(formErrors.password)}
        helperText={formErrors.password}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 1 }}>
        Accedi
      </Button>

      <Button
        type="button"
        variant="text"
        fullWidth
        onClick={() => setRequestNewPassword(true)}
      >
        Password dimenticata?
      </Button>
    </Box>
  );
};

export default LoginForm;
