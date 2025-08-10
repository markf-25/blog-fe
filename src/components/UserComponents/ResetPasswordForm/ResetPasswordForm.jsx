import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useInput from "../../../hooks/useInput.js";

import { hasMinLength, hasMaxLength, areValuesMatching } from "../../../utils/validators.jsx";
import { sendingANewPassword } from "../../../services/password.service.js";

import Toast from "../../Toast/Toast";

const ResetPasswordForm = ({ resetToken }) => {
  const { value: passwordValue, handleChange: handlePasswordChange } = useInput("");
  const { value: confirmPasswordValue, handleChange: handleConfirmPasswordChange } = useInput("");

  const [formErrors, setFormErrors] = useState({ password: "", confirmPassword: "" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastHeader, setToastHeader] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (toastOpen && toastSeverity === "success") {
      timer = setTimeout(() => {
        setToastOpen(false);
        navigate("/");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [toastOpen, toastSeverity, navigate]);

  const handleFormErrorsChange = (key, value) => {
    setFormErrors((prev) => ({ ...prev, [key]: value }));
  };

  const submitPasswordChange = async (event) => {
    event.preventDefault();

    setFormErrors({ password: "", confirmPassword: "" });

    const isPasswordValid = hasMinLength(passwordValue, 8) && hasMaxLength(passwordValue, 60);
    const passwordsMatch = areValuesMatching(passwordValue, confirmPasswordValue);

    if (!isPasswordValid) {
      handleFormErrorsChange("password", "La password deve contenere almeno 8 caratteri e non più di 60");
      return;
    }

    if (!passwordsMatch) {
      handleFormErrorsChange("confirmPassword", "Le password devono corrispondere");
      return;
    }

    const payload = { token: resetToken, password: passwordValue };

    const newPassword = await sendingANewPassword(payload);

    if (newPassword) {
      setToastHeader("Successo");
      setToastMessage("Password cambiata con successo");
      setToastSeverity("success");
      setToastOpen(true);
    } else {
      setToastHeader("Errore");
      setToastMessage("Qualcosa è andato storto");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={submitPasswordChange}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
      >
        <Typography variant="h5" component="h2" textAlign="center" mb={2}>
          Scegli la nuova password
        </Typography>

        <TextField
          id="password"
          label="Password"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
          fullWidth
          autoComplete="new-password"
        />

        <TextField
          id="confirm-password"
          label="Conferma password"
          type="password"
          value={confirmPasswordValue}
          onChange={handleConfirmPasswordChange}
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          fullWidth
          autoComplete="new-password"
        />

        <Button variant="contained" type="submit" fullWidth>
          Invia la nuova password
        </Button>
      </Box>

      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        header={toastHeader}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  );
};

export default ResetPasswordForm;
