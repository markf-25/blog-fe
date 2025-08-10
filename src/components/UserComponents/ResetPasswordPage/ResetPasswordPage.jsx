import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { validateResetToken } from "../../../services/password.service.js";

import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm.jsx";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const validationCheck = async (resetToken) => {
    setIsLoading(true);
    try {
      const checkedToken = await validateResetToken({ token: resetToken });
      if (checkedToken?.valid) {
        setIsTokenValid(true);
      }
    } catch (error) {
      console.error("Errore nella validazione:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTokenToBeChecked = searchParams.get('token');

  useEffect(() => {
    validationCheck(resetTokenToBeChecked);
  }, []);

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      {isLoading && <CircularProgress />}
      {!isLoading && isTokenValid && <ResetPasswordForm resetToken={resetTokenToBeChecked} />}
      {!isLoading && !isTokenValid && (
        <Typography variant="h6" color="error">
          TOKEN NON VALIDO
        </Typography>
      )}
    </Box>
  );
};

export default ResetPasswordPage;
