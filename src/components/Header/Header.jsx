import { AppBar, Toolbar, Box, Stack, IconButton, Button, Typography, Avatar } from "@mui/material";
import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md"; 
import { ThemeContext } from "../../contexts/ThemeProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, userSelector } from "../../reducers/user.slice.js";
import AuthModal from "../UserComponents/AuthModal/AuthModal";
import Image from "../Image/Image";

import logoLight from "../../../src/assets/logo-blog-black.png";
import logoDark from "../../../src/assets/logo-blog-white.png";

const Header = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserPage = location.pathname === "/user";
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const logout = () => {
    dispatch(clearUser());
    if (!isUserPage) {
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("IL NOSTRO TEMA", theme);
  }, [theme]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: "var(--card-bg)",
          borderBottom: "var(--border)",
          height: "10vh",
          justifyContent: "center",
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Left Side */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ color: "var(--text)", ml: 2 }}>
            {user?.accessToken && (
              <Box
                onClick={() => navigate("/user")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  cursor: "pointer",
                }}
              >
                <Avatar src={user.avatar} alt={user.username} />
                <Typography fontSize={20}>{user.username}</Typography>
              </Box>
            )}
          </Stack>

          {/* Logo */}
          <Box
            component="img"
            src={theme === "dark" ? logoDark : logoLight}
            alt="Blog Logo"
            onClick={() => navigate("/")}
            sx={{
              width: "5vh",
              cursor: "pointer",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
            <IconButton onClick={switchTheme}>
              {theme === "dark" ? <MdLightMode color="white" size={20} /> : <MdDarkMode size={20} />}
            </IconButton>
            {user.accessToken ? (
              <IconButton onClick={logout}>
                <MdLogout color={theme === "dark" ? "white" : "black"} size={20} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "0.75rem",
                  px: 3,
                  textTransform: "none",
                  color: "var(--text)",
                  backgroundColor: "var(--bg)",
                  border: "2px solid var(--border)",
                  "&:hover": {
                    filter: "brightness(1.1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => setOpenModal(true)}
              >
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {openModal &&
        createPortal(
          <AuthModal isOpen={openModal} onClose={() => setOpenModal(false)} />,
          document.body
        )}
    </>
  );
};

export default Header;
