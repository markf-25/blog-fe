import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import ResetPasswordRequestForm from "../ResetPasswordRequestForm/ResetPasswordRequestForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [requestNewPassword, setRequestNewPassword] = useState(false);

  const onCloseHandler = () => {
    setIsLogin(true);
    setRequestNewPassword(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onCloseHandler} aria-labelledby="auth-modal-title">
      <Box sx={style}>
        {isLogin && !requestNewPassword && (
          <>
            <LoginForm onClose={onCloseHandler} setRequestNewPassword={setRequestNewPassword} />
            <Box mt={2} textAlign="center">
              <Typography variant="body2" display="inline" mr={1}>
                Non sei registrato?
              </Typography>
              <Button
                variant="text"
                onClick={() => setIsLogin(false)}
                size="small"
                sx={{ textTransform: "none" }}
              >
                Registrati!
              </Button>
            </Box>
          </>
        )}

        {!isLogin && !requestNewPassword && (
          <>
            <RegistrationForm setIsLogin={setIsLogin} />
            <Box mt={2} textAlign="center">
              <Typography variant="body2" display="inline" mr={1}>
                Hai già un account?
              </Typography>
              <Button
                variant="text"
                onClick={() => setIsLogin(true)}
                size="small"
                sx={{ textTransform: "none" }}
              >
                Loggati!
              </Button>
            </Box>
          </>
        )}

        {requestNewPassword && (
          <ResetPasswordRequestForm
            setIsLogin={setIsLogin}
            setRequestNewPassword={setRequestNewPassword}
            onClose={onCloseHandler}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
